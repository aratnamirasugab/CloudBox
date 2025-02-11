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
        if (!fileExisting || !fileExisting.id !== userId) {
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
        if (updateChunkResult.length === 0) {
            console.error('Failed to update Chunk status');
            throw new Error('Internal Server Error');
        }

        const updateFileStatus: [affectedCount: number, affectedRows: File[]] =
            await fileRepository.updateFileUploadStatusWithId(fileExisting.id, Status.UPLOADING.toString());
        if (updateFileStatus.length === 0) {
            console.error('Failed to update Chunk status');
            throw new Error('Internal Server Error');
        }

        const updateChunkSessionStatus: [affectedCount: number, affectedRows: UploadSession[]] =
            await uploadSessionRepository.updateChunkSessionStatusByFileId(fileExisting.id, Status.UPLOADING.toString());
        if (updateChunkSessionStatus.length === 0) {
            console.error('Failed to update Chunk session status');
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

        if (existingUploadSession.totalChunks !== payload.chunkIds.length
            || existingUploadSession.totalChunks !== payload.eTags.length) {
            console.warn('Total Chunk is not the same.');
            throw new Error('Internal Server Error');
        }

        // validate each Etag
        const existingChunks: [UploadChunk] = await uploadChunkRepository.findByFileId(existingFile.id);
        if (!existingChunks) {
            console.error('Failed to find Chunk');
            throw new Error('Internal Server Error');
        }

        const eTagsExisting = new Set(existingChunks.map(chunk => chunk.eTag));
        const eTagsPayload = new Set(payload.eTags);

        for (const eTag of eTagsExisting) {
            if (!eTagsPayload.has(eTag)) {
                console.log('Corrupt ETag');
                throw new Error('Internal Server Error');
            }
        }
        
        existingUploadSession.status = Status.FINISHED.toString();
        const [affectedNumberUploadSessionUpdate] : [number] =
            await uploadSessionRepository.updateById(existingUploadSession, existingUploadSession.id);
        if (affectedNumberUploadSessionUpdate === 0) {
            console.error('Update failed: No records were affected.');
            throw new Error('Internal Server Error');
        }


        // S3 API Call to Complete Multipart Upload.
        try {
            const completeMultipartResponse: S3.Types.CompleteMultipartUploadOutput =
                await fileRepository.completeMultipartUploadS3()
        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }





    }

}
