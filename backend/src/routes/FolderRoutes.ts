import express, {NextFunction, Request, Response} from 'express';
import Validator from "../middleware/validator";
import ResponseHandler from "../utils/ResponseHandler";
import verifyToken from "../middleware/token";
import Authentication from "../model/Authentication";
import {FolderService} from "../service/FolderService";
import {ViewFolderRequest} from "../model/ViewFolderRequest";
import {ViewFolderResponse} from "../model/ViewFolderResponse";
import {CreateFolderDTO} from "../model/CreateFolderRequest";
import {CreateFolderResponse} from "../model/CreateFolderResponse";
import {UpdateFolderRequest} from "../model/UpdateFolderRequest";
import {UpdateFolderResponse} from "../model/UpdateFolderResponse";
import {DeleteFolderRequest} from "../model/DeleteFolderRequest";
import {DeleteFolderResponse} from "../model/DeleteFolderResponse";

const router = express.Router();

const folderService = new FolderService();

router.post('/folder/create',
    verifyToken,
    Validator.classValidator(CreateFolderDTO),
    async (req, res, next: NextFunction) => {

    try {
        const createFolderPayload: CreateFolderDTO = req.body;
        const authenticated: Authentication = req.body.verify;
        const result: CreateFolderResponse = await folderService.createANewFolder(
            createFolderPayload.parentFolderId, authenticated.userId, createFolderPayload.name);
        return ResponseHandler.success(res, result);
    } catch (e) {
        next(e);
    }
});

router.get('/folder/view',
    verifyToken,
    Validator.classValidator(ViewFolderRequest),
    async (req: Request, res: Response, next: NextFunction) => {

    try {
        const payload: ViewFolderRequest = req.body;
        const authenticated: Authentication = req.body.verify;
        const fileFolderResult: ViewFolderResponse = await folderService.getFolderViewByFolderId(
            payload.folderId, authenticated.userId
        );
        return ResponseHandler.success(res, fileFolderResult);
    } catch (e) {
        next(e);
    }
})

router.patch('/folder/update', 
    verifyToken, 
    Validator.classValidator(UpdateFolderRequest),
    async (req, res, next: NextFunction) => {

    try {
        const payload: UpdateFolderRequest = req.body;
        const authenticated: Authentication = req.body.verify;

        const result: UpdateFolderResponse = await folderService.updateFolderByFolderId(payload, authenticated.userId);
        return ResponseHandler.success(res, result);
    } catch (e) {
        next(e);
    }
})

router.delete('/folder/delete',
    verifyToken,
    Validator.classValidator(DeleteFolderRequest),
    async (req, res, next: NextFunction) => {

    try {
        const authenticated: Authentication = req.body.verify;
        const payload: DeleteFolderRequest = req.body;

        const filteredResponse: DeleteFolderResponse = await folderService.deleteFolderById(
            payload.folderId, authenticated.userId
        );
        return ResponseHandler.success(res, filteredResponse);
    } catch (e) {
        next(e);
    }
})

export default router;
