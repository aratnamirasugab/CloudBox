import express from "express";
import verifyToken from "../middleware/token";
import Validator from "../middleware/validator";
import {CompleteUploadChunkDTO} from "../database/model/UploadChunk";
import ResponseHandler from "../utils/ResponseHandler";
import Authentication from "../model/Authentication";
import {UploadChunkService} from "../service/UploadChunkService";

const router = express.Router();
const uploadChunkService = new UploadChunkService();

router.patch('/upload_chunk/notify/specific',
    verifyToken,
    Validator.classValidator(CompleteUploadChunkDTO),
    async (req, res) => {

    try {
        const chunkNotifyPayload: CompleteUploadChunkDTO = req.body;
        const authenticated: Authentication = req.body.verify;
        return await uploadChunkService.patchChunkDetail(chunkNotifyPayload, authenticated.getUserId());
    } catch (error) {
        console.log(`Failed during chunk patching process ${error}`);
        return ResponseHandler.error(res);
    }
});

router.post('/upload_chunk/notify/all',
    verifyToken,
    Validator.classValidator(),
    async (req, res) => {

    try {

        return await uploadChunkService
    } catch (error) {
        return ResponseHandler.error(res);
    }
})

export default router;