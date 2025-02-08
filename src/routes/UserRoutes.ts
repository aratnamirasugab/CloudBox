import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from '../service/UserService';

import * as dotenv from 'dotenv';
import verifyToken from "../middleware/token";

const router = express.Router();
const userService = new UserService();

dotenv.config();

router.post('/user/register', async (
        req,
        res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'email and password are required' });
        return;
    }

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
        console.warn('User is not found : ' + email);
        return ResponseHandler.error(res);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        console.error('Failed during hashing password');
        return ResponseHandler.error(res);
    }

    const user = await userService.createUser(email, hashedPassword);
    res.status(200).json(user);
});

router.post('/user/login', async (
        req,
        res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'email and password are required' });
        return;
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
        res.status(400).json({ error: 'user not found' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ error: 'invalid password' });
        return;
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    });

    res.status(200).json({
        'message': 'login successful, token is valid for 1 hour',
        'token': token
    });
});

router.get('/user/:id', verifyToken, async(
    req,
    res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).json({ error: 'id is required' });
        return;
    }

    const user = await userService.getUserById(id);
    res.status(200).json(user);
});

router.get('/user/email/:email', verifyToken, async(
    req,
    res) => {
    const email = req.params.email;

    if (!email) {
        res.status(400).json({ error: 'email is required' });
        return
    }

    const user = await userService.getUserByEmail(email);
    res.status(200).json(user);
});

router.patch('/user/:id', verifyToken, async(
    req,
    res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).json({ error: 'id is required' });
        return;
    }

    const { old_password, password } = req.body;

    if (!old_password || !password) {
        res.status(400).json({ error: 'password is required / old password must be specified' });
        return;
    }

    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
        res.status(400).json({ error: 'user not found' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(old_password, existingUser.password);
    if (!isPasswordValid) {
        res.status(400).json({ error: 'invalid old password' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.updateUserPasswordById(id, hashedPassword);
    res.json(user);
});

router.delete('/user/:id', verifyToken, async(
    req,
    res) => {
    const id = parseInt(req.params.id);
    const user = await userService.deleteUserById(id);
    res.json(user);
});

export default router;