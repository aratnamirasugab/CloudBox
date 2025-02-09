import express from 'express';
import FolderService from '../service/FolderService';
import Validator from "../middleware/validator";
import Folder, {CreateFolderDTO, CreateFolderResponse} from "../database/model/Folder";
import ResponseHandler from "../utils/ResponseHandler";
import verifyToken from "../middleware/token";
import Authentication from "../model/Authentication";

const router = express.Router();
const folderService = new FolderService();

router.post('/folder/create',
    verifyToken,
    Validator.classValidator(CreateFolderDTO),
    async (req, res) => {

    try {
        const createFolderPayload: CreateFolderDTO = req.body;
        const authenticated: Authentication = req.body.verify;
        const folder: Folder = await folderService.createFolder(
                createFolderPayload,
                authenticated.getUserId()
        );

        const filteredResponse: CreateFolderResponse = new CreateFolderResponse(folder);
        return ResponseHandler.success(res, filteredResponse);
    } catch (error) {
        console.error('Error creating folder: ', error);
        return ResponseHandler.error(res);
    }
});

export default router;
