import express from 'express';
import FileService from '../service/FileService';

const router = express.Router();
const fileService  = new FileService();

router.get('/file/:id', async (
        req,
        res) => {
    const id = parseInt(req.params.id);
    const file = await fileService.getFileById(id);
    res.json(file);
});

router.post('/file/create', async(
        req,
        res) => {
    const { folderId, userId, name, mimeType, size} = req.body;
    const file = await fileService.createFile(folderId, userId, name,
            mimeType, size);
    res.json(file);
});

router.delete('/file/:id', async(
        req,
        res) => {
    const id = parseInt(req.params.id);
    const file = await fileService.deleteFileById(id);
    res.json(file);
});

router.get('/file/folder/:folderId', async(
        req,
        res) => {
    const folderId = parseInt(req.params.folderId);
    const files = await fileService.getFilesByFolderId(folderId);
    res.json(files);
});

router.patch('/file/:id', async(
        req,
        res) => {
    const id = parseInt(req.params.id);
    const { folderId, userId, name, mimeType, size, uploadStatus, createdAt, isDeleted} = req.body;
    const file = await fileService.updateFileById(id, folderId, userId, name,
            mimeType, size, uploadStatus, createdAt, isDeleted);
    res.json(file);
})

export default router;