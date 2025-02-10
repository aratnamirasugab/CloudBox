import express from "express";
import verifyToken from "../middleware/token";
import Validator from "../middleware/validator";
import {CompleteUploadChunkDTO} from "../database/model/UploadChunk";
import ResponseHandler from "../utils/ResponseHandler";
import Authentication from "../model/Authentication";

const router = express.Router();

router.patch('/upload_chunk/notify',
    verifyToken,
    Validator.classValidator(CompleteUploadChunkDTO),
    async (req, res) => {

    try {
        const chunkNotifyPayload: CompleteUploadChunkDTO = req.body;
        const authenticated: Authentication = req.body.verify;


    } catch (error) {
        console.log(`Failed during chunk patching process ${error}`);
        return ResponseHandler.error(res);
    }

})