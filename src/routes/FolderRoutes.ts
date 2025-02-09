import express from 'express';
import FolderService from '../service/FolderService';
import Validator from "../middleware/validator";
import {CreateFolderDTO} from "../database/model/Folder";

const router = express.Router();
const folderService = new FolderService();

router.post('/folder/create',
    Validator.classValidator(CreateFolderDTO),
    async (req, res) => {
    const { name, userId } = req.body;
    const folder = await folderService.createFolder(name, userId);
    res.json(folder);
});

export default router;
