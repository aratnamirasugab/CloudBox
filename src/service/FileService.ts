import {
    DeleteFileRequestDTO,
    File,
    FileUploadingInitialization,
    FileUploadingInitiationResponse
} from '../database/model/File';
import {CreateUploadSession, UploadSession} from "../database/model/UploadSession";
import {CreateUploadChunk} from "../database/model/UploadChunk";
import {UploadChunkRepository} from "../database/repositories/UploadChunkRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {UploadSessionRepository} from "../database/repositories/UploadSessionRepository";
import {S3} from "aws-sdk";

const uploadChunkRepository = new UploadChunkRepository();
const fileRepository = new FileRepository();
const uploadSessionRepository = new UploadSessionRepository();

class FileService {

    async initiateUpload(payload: FileUploadingInitialization): Promise<FileUploadingInitiationResponse> {

        if (0 === payload.totalChunks) {
            throw new Error('Internal Server Error');
        }

        const file: File = await fileRepository.create(payload);

        if (!file) {
            console.error(`File is failed to create. folderId : ${payload.folderId} . userId : ${payload.userId}`);
            throw new Error('Internal Server Error');
        }

        const uploadSessionPayload = new CreateUploadSession(file.id, payload.totalChunks);
        const uploadSession: UploadSession = await uploadSessionRepository.create(uploadSessionPayload);

        if (!uploadSession) {
            console.error(`Upload Session is failed to create. fileId : ${file.id} . userId : ${payload.userId}`);
            throw new Error('Internal Server Error');
        }

        for (let i = 0 ; i < payload.totalChunks ; i++) {
            const sizeChunk = Math.ceil(file.size / payload.totalChunks);

            // parallel chunk creation.
            const chunks = Array.from({ length: payload.totalChunks }, (_, i) =>
                uploadChunkRepository.createUploadChunk(new CreateUploadChunk(file.id, i, sizeChunk))
            );
            await Promise.all(chunks);
        }

        // if file size is < 100MB use single upload API.
        if (payload.size < 100 * 1024 * 1024) { // 100MB
            try {
                const preSignedURL: string = await fileRepository.getSingleUploadUrl(file.mimeType, file.name);
                return new FileUploadingInitiationResponse(undefined, preSignedURL);
            } catch (error) {
                throw new Error('Internal Server Error');
            }
        } else {
            try {
                const multipartResponse: S3.Types.CreateMultipartUploadOutput =
                    await fileRepository.initiateMultipartUploadS3(file.mimeType, file.name);
                return new FileUploadingInitiationResponse(multipartResponse.UploadId, undefined);
            } catch (error) {
                throw new Error('Internal Server Error');
            }
        }
    }

    async getFilesByKey(key: string, userId: number): Promise<File[]> {

        if (!key) {
            return undefined;
        }

        return fileRepository.getFilesWithKey(key, userId);
    }

    async deleteFileByFileIds(payload: DeleteFileRequestDTO, userId: number): Promise<void> {
        const existingFiles: File[] =
            await fileRepository.getFileWithIdsUserIds(payload.currentFolderId, payload.fileIds, userId);
        if (!existingFiles) {
            return;
        }

        const [affectedCount] = await fileRepository.deleteFilesWithIds(payload.fileIds, payload.currentFolderId);
        if (affectedCount === 0) {
            console.error(`Files failed to deleted. Ids : ${payload.fileIds}`);
            throw new Error('Internal Server Error');
        }
    }
}

export default FileService;