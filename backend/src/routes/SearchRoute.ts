import {Router} from "express";
import verifyToken from "../middleware/token";
import ResponseHandler from "../utils/ResponseHandler";
import {Folder} from "../database/model/Folder";
import {File} from "../database/model/File";
import {FileService} from "../service/FileService";
import {FolderService} from "../service/FolderService";
import Authentication from "../model/Authentication";
import {SearchResults} from "../model/Search";

const router = Router();

const fileService = new FileService();
const folderService = new FolderService();

router.get('/search', verifyToken, async (req, res) => {

    try {
        const key: string = req.params.key;
        const authenticated: Authentication = req.body.verify;
        const files: File[] = await fileService.getFilesByKey(key, authenticated.getUserId());
        const folders: Folder[] = await folderService.getFolderByKey(key, authenticated.getUserId());
        return ResponseHandler.success(res, new SearchResults(files, folders));
    } catch (error) {
        return ResponseHandler.error(res);
    }
})

export default router;