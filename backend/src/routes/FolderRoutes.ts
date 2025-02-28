import express, {Request, Response} from 'express';
import Validator from "../middleware/validator";
import {DeleteFolderRequestDTO, DeleteFolderResponseDTO, UpdateFolderDTO} from "../database/model/Folder";
import ResponseHandler from "../utils/ResponseHandler";
import verifyToken from "../middleware/token";
import Authentication from "../model/Authentication";
import {FolderService} from "../service/FolderService";
import {ViewFolderRequest} from "../model/ViewFolderRequest";
import {ViewFolderResponse} from "../model/ViewFolderResponse";
import {CreateFolderDTO} from "../model/CreateFolderRequest";
import {CreateFolderResponse} from "../model/CreateFolderResponse";

const router = express.Router();

const folderService = new FolderService();

router.post('/folder/create',
    verifyToken,
    Validator.classValidator(CreateFolderDTO),
    async (req, res) => {

    const createFolderPayload: CreateFolderDTO = req.body;
    const authenticated: Authentication = req.body.verify;
    const result: CreateFolderResponse = await folderService.createANewFolder(
        createFolderPayload.parentFolderId, authenticated.userId, createFolderPayload.name);
    return ResponseHandler.success(res, result);
});

router.get('/folder/view',
    verifyToken,
    Validator.classValidator(ViewFolderRequest),
    async (req: Request, res: Response) => {

    const payload: ViewFolderRequest = req.body;
    const authenticated: Authentication = req.body.verify;
    const fileFolderResult: ViewFolderResponse = await folderService.getFolderViewByFolderId(
        payload.folderId, authenticated.userId
    );
    return ResponseHandler.success(res, fileFolderResult);
})

router.patch('/folder/update', 
    verifyToken, 
    Validator.classValidator(UpdateFolderDTO),
    async (req, res) => {

    try {
        const payload: UpdateFolderDTO = req.body;
        const authenticated: Authentication = req.body.verify;

        await folderService.updateFolderByFolderId(payload, authenticated.userId);
        return ResponseHandler.success(res);
    } catch (error) {
        return ResponseHandler.error(error);
    }
})

router.delete('/folder/delete', verifyToken, Validator.classValidator(DeleteFolderRequestDTO), async (req, res) => {
    try {
        const authenticated: Authentication = req.body.verify;
        const payload: DeleteFolderRequestDTO = req.body;

        const filteredResponse: DeleteFolderResponseDTO = await folderService.deleteFolderById(
            payload.folderId, authenticated.userId
        );
        return ResponseHandler.success(res, filteredResponse);
    } catch (error) {
        console.error()
        return ResponseHandler.error(res);
    }
})

export default router;
