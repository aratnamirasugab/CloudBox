import express from "express";
import verifyToken from "../middleware/token";
import ResponseHandler from "../utils/ResponseHandler";
import Authentication from "../model/Authentication";
import {TrashItem} from "../database/model/TrashBin";
import {TrashBinService} from "../service/TrashBinService";

const router = express.Router();

const trashBinService = new TrashBinService();