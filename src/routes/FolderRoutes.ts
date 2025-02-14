import express from 'express';
import Validator from "../middleware/validator";
import {
    CreateFolderDTO,
    CreateFolderResponse,
    Folder,
    UpdateFolderDTO,
    ViewFolderDTO,
    ViewFolderResponse
} from "../database/model/Folder";
import ResponseHandler from "../utils/ResponseHandler";
import verifyToken from "../middleware/token";
import Authentication from "../model/Authentication";
import {FolderRepository} from "../database/repositories/FolderRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {File} from "../database/model/File";
import {FolderService} from "../service/FolderService";

const router = express.Router();

const folderService = new FolderService();

const folderRepository = new FolderRepository();
const fileRepository = new FileRepository();

router.post('/folder/create',
    verifyToken,
    Validator.classValidator(CreateFolderDTO),
    async (req, res) => {

    try {
        const createFolderPayload: CreateFolderDTO = req.body;
        const authenticated: Authentication = req.body.verify;
        const folder: Folder = await folderRepository.createFolder(createFolderPayload, authenticated.getUserId());
        return ResponseHandler.success(res, new CreateFolderResponse(folder));
    } catch (error) {
        return ResponseHandler.error(res);
    }
});

router.get('/folder/view',
    verifyToken,
    Validator.classValidator(ViewFolderDTO),
    async (req, res) => {

    try {
        const payload: ViewFolderDTO = req.body;
        const authenticated: Authentication = req.body.verify;

        const files: File[]  = await fileRepository.getFilesWithFolderId(payload.folderId, authenticated.getUserId());
        const folders: Folder[] = await folderRepository.getFoldersByParentFolderId(
            payload.folderId, authenticated.getUserId());
        return ResponseHandler.success(res, new ViewFolderResponse(folders, files));
    } catch (error) {
        return ResponseHandler.error(res);
    }
})

router.patch('/folder/update', 
    verifyToken, 
    Validator.classValidator(UpdateFolderDTO),
    async (req, res) => {

    try {
        const payload: UpdateFolderDTO = req.body;
        const authenticated: Authentication = req.body.verify;

        await folderService.updateFolderByFolderId(payload, authenticated.getUserId());
        return ResponseHandler.success(res);
    } catch (error) {
        return ResponseHandler.error(error);
    }
})

export default router;
