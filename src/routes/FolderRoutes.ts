import express from 'express';
import FolderService from '../service/FolderService';

const router = express.Router();
const folderService = new FolderService();

router.post('/folder/create', async (
        req,
        res) => {
    const { name, userId } = req.body;
    const folder = await folderService.createFolder(name, userId);
    res.json(folder);
});

router.get('/folder/:id', async(
    req,
    res) => {
    const id = parseInt(req.params.id);
    const folder = await folderService.getFolderById(id);
    res.json(folder);
});

export default router;
