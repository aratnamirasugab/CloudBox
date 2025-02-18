import express from "express";
import {TrashBinService} from "../service/TrashBinService";
import verifyToken from "../middleware/token";
import ResponseHandler from "../utils/ResponseHandler";
import Authentication from "../model/Authentication";
import {ViewTrashResponse} from "../model/ViewTrashResponse";
import {ObjectRestorationRequest} from "../model/ObjectRestorationRequest";
import {ObjectRestorationResponse} from "../model/ObjectRestorationResponse";

const router = express.Router();

const trashBinService = new TrashBinService();

router.get('/trash_bin/view', verifyToken, async (req, res) => {
    try {
        const auth: Authentication = req.body.verify;
        const filteredResponse: ViewTrashResponse = await trashBinService.getTrashesByUserId(auth.userId);
        return ResponseHandler.success(res, filteredResponse);
    } catch (e) {
        return ResponseHandler.error(res);
    }
})

router.patch('/trash_bin/restore', verifyToken, async (req, res) => {

    // TODO : add class validator.
    try {
        const auth: Authentication = req.body.verify;
        const payload: ObjectRestorationRequest = req.body;
        const filteredResponse: ObjectRestorationResponse = await trashBinService.restoreTrashesByUserId(
            auth.userId, payload
        );
        return ResponseHandler.success(res, filteredResponse);
    } catch (e) {
        return ResponseHandler.error(res);
    }

})