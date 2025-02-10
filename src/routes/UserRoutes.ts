import express from 'express';
import UserService from '../service/UserService';

import * as dotenv from 'dotenv';
import ResponseHandler from "../utils/ResponseHandler";
import Validator from "../middleware/validator";
import {CreateUserDTO} from "../database/model/User";

const router = express.Router();
const userService = new UserService();

dotenv.config();

router.post('/user/register',
    Validator.classValidator(CreateUserDTO),
    async (req, res) => {

    try {
        const userDTO: CreateUserDTO = req.body;
        await userService.registerNewUser(userDTO);
        return ResponseHandler.success(res);
    } catch (error) {
        console.log('Error during register user: ', error);
        return ResponseHandler.error(res);
    }
});

router.post('/user/login',
    Validator.classValidator(CreateUserDTO),
    async (req, res) => {

    try {
        const loginPayload: CreateUserDTO = req.body;
        const token = await userService.loginUser(loginPayload);
        return ResponseHandler.success(res, token);
    } catch (error) {
        console.log('Error during login user: ', error);
        return ResponseHandler.error(res);
    }
});

export default router;