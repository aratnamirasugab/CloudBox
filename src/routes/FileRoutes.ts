import express from 'express';
import FileService from '../service/FileService';
import verifyToken from "../middleware/token";
import Validator from "../middleware/validator";
import {FileUploadingInitialization, FileUploadingInitiationResponse, UploadFileDTO} from "../database/model/File";
import ResponseHandler from "../utils/ResponseHandler";
import Authentication from "../model/Authentication";

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

export default router;