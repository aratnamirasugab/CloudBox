import express from 'express';
import {FileService} from '../service/FileService';
import verifyToken from "../middleware/token";
import Validator from "../middleware/validator";
import {
    DeleteFileRequestDTO,
    FileUploadingInitialization,
    FileUploadingInitiationResponse,
    UploadFileDTO
} from "../database/model/File";
import ResponseHandler from "../utils/ResponseHandler";
import Authentication from "../model/Authentication";
import {DeleteFileResponse} from '../model/DeleteFileResponse';

const router = express.Router();
const fileService  = new FileService();

router.post('/file/upload/new',
    verifyToken,
    Validator.classValidator(UploadFileDTO),
    async (req, res) => {

    try {
        const uploadFileDTO: UploadFileDTO = req.body;
        const authenticated: Authentication = req.body.verify;

        const fileInitializationPayload: FileUploadingInitialization = 
            new FileUploadingInitialization(uploadFileDTO, authenticated.getUserId());
        const filteredResponse: FileUploadingInitiationResponse =
            await fileService.initiateUpload(fileInitializationPayload);
        return ResponseHandler.success(res, filteredResponse);
    } catch (error) {
        console.log(`Failed during file uploading process ${error}`);
        return ResponseHandler.error(res);
    }
})

router.delete('/file/delete',
    verifyToken,
    Validator.classValidator(DeleteFileRequestDTO),
    async (req, res) => {

    try {
        const payload: DeleteFileRequestDTO = req.body;
        const authenticated: Authentication = req.body.verify;

        const filteredResponse: DeleteFileResponse = await fileService.deleteFileByFileIds(payload, authenticated.getUserId());
        return ResponseHandler.success(res, filteredResponse);
    } catch (error) {
        return ResponseHandler.error(res);
    }
})

export default router;