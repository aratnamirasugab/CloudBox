import {CompleteUploadChunkDTO, CompleteUploadChunkResponse, UploadChunk} from "../database/model/UploadChunk";
import {UploadChunkRepository} from "../database/repositories/UploadChunkRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {File} from "../database/model/File";
import {Status} from "../model/enum/Status";
import {UploadSessionRepository} from "../database/repositories/UploadSessionRepository";
import {UploadSession} from "../database/model/UploadSession";

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

        const chunkExisting = await uploadChunkRepository.findById(payload.fileId);
        if (!chunkExisting) {
            console.warn('Chunk does not exist')
            throw new Error('Internal Server Error');
        }

        const updateChunkResult: [affectedCount: number, affectedRows: UploadChunk[]] =
            await uploadChunkRepository.updateChunkStatus(chunkExisting, true);
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
            await uploadSessionRepository.updateChunkSessionStatusByFileId(
                fileExisting.id, Status.UPLOADING.toString());
        if (updateChunkSessionStatus.length === 0) {
            console.error('Failed to update Chunk session status');
            throw new Error('Internal Server Error');
        }

        return new CompleteUploadChunkResponse(fileExisting.id, chunkExisting.id, "Successfully updated.");
    }

}
