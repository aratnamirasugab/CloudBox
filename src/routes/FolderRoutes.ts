import express from 'express';
import Validator from "../middleware/validator";
import {
    CreateFolderDTO,
    CreateFolderResponse,
    Folder,
    ViewFolderDTO,
    ViewFolderResponse
} from "../database/model/Folder";
import ResponseHandler from "../utils/ResponseHandler";
import verifyToken from "../middleware/token";
import Authentication from "../model/Authentication";
import {FolderRepository} from "../database/repositories/FolderRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {File} from "../database/model/File";

const router = express.Router();

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

export default router;
