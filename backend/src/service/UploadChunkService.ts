import {
    CompleteUploadChunkDTO,
    CompleteUploadChunkResponse,
    FinishUploadAllChunkDTO,
    UploadChunk
} from "../database/model/UploadChunk";
import {UploadChunkRepository} from "../database/repositories/UploadChunkRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {File} from "../database/model/File";
import {Status} from "../model/enum/Status";
import {UploadSessionRepository} from "../database/repositories/UploadSessionRepository";
import {UploadSession} from "../database/model/UploadSession";
import {S3} from "aws-sdk";

const uploadChunkRepository = new UploadChunkRepository();
const fileRepository = new FileRepository();
const uploadSessionRepository = new UploadSessionRepository();

export class UploadChunkService {

    async patchChunkDetail(payload: CompleteUploadChunkDTO, userId: number): Promise<CompleteUploadChunkResponse> {
        const fileExisting: File = await fileRepository.findById(payload.fileId);
        if (!fileExisting || fileExisting.id !== userId) {
            console.warn('File does not exist or not owned by user.');
            throw new Error('Internal Server Error');

        }
        const chunkExisting: UploadChunk = await uploadChunkRepository.findById(payload.fileId);
        if (!chunkExisting) {
            console.warn('Chunk does not exist')
            throw new Error('Internal Server Error');
        }

        chunkExisting.eTag = payload.etag;
        chunkExisting.isUploaded = true;
        chunkExisting.uploadedAt = new Date();

        const updateChunkResult: [affectedCount: number, affectedRows: UploadChunk[]] =
            await uploadChunkRepository.updateChunkById(chunkExisting, chunkExisting.id);
        if (updateChunkResult[1].length === 0) {
            console.error(`Failed to update Chunk status. Chunk Id : ${chunkExisting.id}`);
            throw new Error('Internal Server Error');
        }

        const updateFileStatus: [affectedCount: number, affectedRows: File[]] =
            await fileRepository.updateFileUploadStatusWithId(fileExisting.id, Status.UPLOADING.toString());
        if (updateFileStatus[1].length === 0) {
            console.error(`Failed to update Chunk status. File Id :${fileExisting.id}`);
            throw new Error('Internal Server Error');
        }

        const updateChunkSessionStatus: [affectedCount: number, affectedRows: UploadSession[]] =
            await uploadSessionRepository.updateChunkSessionStatusByFileId(fileExisting.id, Status.UPLOADING.toString());
        if (updateChunkSessionStatus[1].length === 0) {
            console.error(`Failed to update Chunk session status. Upload Session with File Id: ${fileExisting.id}`);
            throw new Error('Internal Server Error');
        }

        return new CompleteUploadChunkResponse(fileExisting.id, [chunkExisting.id], "Successfully updated.");
    }

    async notifyAllChunkCompleted(payload: FinishUploadAllChunkDTO, userId: number):
        Promise<CompleteUploadChunkResponse> {

        const existingFile: File = await fileRepository.findById(payload.fileId);
        if (!existingFile || existingFile.userId !== userId) {
            console.warn('File does not exist');
            throw new Error('Internal Server Error');
        }

        const existingUploadSession: UploadSession = await uploadSessionRepository.findByFileId(existingFile.id);
        if (!existingUploadSession) {
            console.warn('Upload Session does not exist');
            throw new Error('Internal Server Error');
        }

        if (existingUploadSession.totalChunks !== payload.chunkIdETagList.length) {
            console.warn('Total Chunk is not the same.');
            throw new Error('Internal Server Error');
        }

        const existingChunks: UploadChunk[] = await uploadChunkRepository.findByFileId(existingFile.id);
        if (!existingChunks || existingChunks.length === 0) {
            console.error(`Failed to find chunk with file Id : ${existingFile.id}`);
            throw new Error('Internal Server Error');
        }

        const eTagsExisting = new Set(existingChunks.map(chunk => chunk.eTag));
        const eTagsPayload = new Set(payload.chunkIdETagList.map((chunkIdETag) => chunkIdETag.eTag));

        for (const eTag of eTagsExisting) {
            if (!eTagsPayload.has(eTag)) {
                console.log(`Corrupt ETag. Upload Session Id : ${existingUploadSession.id}`);
                throw new Error('Internal Server Error');
            }
        }
        
        existingUploadSession.status = Status.FINISHED.toString();
        const updateUploadSessionResult : [affectedAccount: number] =
            await uploadSessionRepository.updateById(existingUploadSession, existingUploadSession.id);
        if (updateUploadSessionResult[0] === 0) {
            console.error('Update failed: No records were affected.');
            throw new Error('Internal Server Error');
        }

        // TODO: separate using factory method.
        // S3 API Call to Complete Multipart Upload.
        let blobLink: string = undefined;
        try {
            const completeMultipartResponse: S3.Types.CompleteMultipartUploadOutput =
                await fileRepository.completeMultipartUploadS3(payload);
            blobLink = completeMultipartResponse.Location;
        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }

        existingFile.blobLink = blobLink;
        existingFile.updatedAt = new Date();
        await fileRepository.updateWithFileId(existingFile.id, existingFile);

        const chunksId: number[] = existingChunks.map((chunk) => chunk.id);
        return new CompleteUploadChunkResponse(existingFile.id, chunksId, "Successfully updated.");
    }


}
