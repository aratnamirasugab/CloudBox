import {File, FileUploadingInitialization, FileUploadingInitiationResponse} from '../database/model/File';
import {CreateUploadSession, UploadSession} from "../database/model/UploadSession";
import UploadSessionService from "./UploadSessionService";

const uploadSessionService = new UploadSessionService();

class FileService {

    async initiateUpload(payload: FileUploadingInitialization) {

        if (0 === payload.totalChunks) {
            throw new Error('Internal Server Error');
        }

        const file: File = await File.create({
            folderId: payload.folderId,
            userId: payload.userId,
            name: payload.name,
            mimeType: payload.mimeType,
            size: payload.size,
            uploadStatus: payload.uploadStatus,
            createdAt: payload.createdAt,
            isDeleted: payload.isDeleted,
        });

        if (!file) {
            console.error(`File is failed to create. folderId : ${payload.folderId} . userId : ${payload.userId}`);
            throw new Error('Internal Server Error');
        }

        // TODO : add an algo to decide if single upload / multipart upload here. < 5 MB per chunk must use single upload API.
        const uploadSessionPayload = new CreateUploadSession(file.id, payload.totalChunks);
        const uploadSession: UploadSession = await uploadSessionService.createNewUploadSession(uploadSessionPayload);

        if (!uploadSession) {
            console.error(`Upload Session is failed to create. fileId : ${file.id} . userId : ${payload.userId}`);
            throw new Error('Internal Server Error');
        }

        // upload chunk
        for (let i = 0 ; i < payload.totalChunks ; i++) {

        }


        // init upload to s3
        // return upload ID and bucket
        // return new FileUploadingInitiationResponse();
    }
}

export default FileService;