import {File, FileUploadingInitialization} from '../database/model/File';
import {CreateUploadSession, UploadSession} from "../database/model/UploadSession";
import UploadSessionService from "./UploadSessionService";
import {CreateUploadChunk} from "../database/model/UploadChunk";
import {UploadChunkRepository} from "../database/repositories/UploadChunkRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {UploadSessionRepository} from "../database/repositories/UploadSessionRepository";

const uploadChunkRepository = new UploadChunkRepository();
const fileRepository = new FileRepository();
const uploadSessionRepository = new UploadSessionRepository();

class FileService {

    async initiateUpload(payload: FileUploadingInitialization) {

        if (0 === payload.totalChunks) {
            throw new Error('Internal Server Error');
        }

        const fileCreationPayload = new File({ folderId: payload.folderId, userId: payload.userId, name: payload.name,
            mimeType: payload.mimeType, size: payload.size, uploadStatus: payload.uploadStatus,
            createdAt: payload.createdAt, isDeleted: payload.isDeleted,
        });

        const file: File = await fileRepository.create(fileCreationPayload);

        if (!file) {
            console.error(`File is failed to create. folderId : ${payload.folderId} . userId : ${payload.userId}`);
            throw new Error('Internal Server Error');
        }

        // TODO : add an algo to decide if single upload / multipart upload here. < 5 MB per chunk must use single upload API.
        const uploadSessionPayload = new CreateUploadSession(file.id, payload.totalChunks);
        const uploadSession: UploadSession = await uploadSessionRepository.create(uploadSessionPayload);

        if (!uploadSession) {
            console.error(`Upload Session is failed to create. fileId : ${file.id} . userId : ${payload.userId}`);
            throw new Error('Internal Server Error');
        }

        for (let i = 0 ; i < payload.totalChunks ; i++) {
            const sizeChunk = Math.ceil(file.size / payload.totalChunks);
            const chunk: CreateUploadChunk = new CreateUploadChunk(file.id, i, sizeChunk);

            const uploadChunk = await uploadChunkRepository.createUploadChunk(chunk);
            if (!uploadChunk) {
                console.error(`Failed to process upload chunk. FileId ${file.id} . 
                    Chunk Index: ${i} . userId : ${payload.userId}`);
                throw new Error('Internal Server Error');
            }
        }




        // init upload to s3
        // return upload ID and bucket
        // return new FileUploadingInitiationResponse();
    }
}

export default FileService;