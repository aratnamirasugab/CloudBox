import express from "express";
import verifyToken from "../middleware/token";
import ResponseHandler from "../utils/ResponseHandler";
import Authentication from "../model/Authentication";
import {TrashItem} from "../database/model/TrashBin";
import {TrashBinService} from "../service/TrashBinService";

const router = express.Router();

const trashBinService = new TrashBinService();

router.get('/trash_bin/view ', verifyToken, async (req, res) => {

    try {
        const auth: Authentication = req.body.verify;
        const trashBin: TrashItem[] = await trashBinService.getTrashesByUserId(auth.getUserId());
        return ResponseHandler.success(res, trashBin);
    } catch (error) {
        return ResponseHandler.error(res);
    }
})