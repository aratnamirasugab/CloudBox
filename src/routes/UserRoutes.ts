import express from 'express';
import bcrypt from 'bcryptjs';
import UserService from '../service/UserService';

const router = express.Router();
const userService = new UserService();

router.post('/user/create', async (
        req,
        res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'email and password are required' });
        return;
    }

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
        res.status(400).json({ error: 'email already exists' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        res.status(500).json({ error: 'failed to hash password' });
        return
    }

    const user = await userService.createUser(email, hashedPassword);
    res.json(user);
});

router.get('/user/:id', async(
    req,
    res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).json({ error: 'id is required' });
        return;
    }

    const user = await userService.getUserById(id);
    res.json(user);
});

router.get('/user/email/:email', async(
    req,
    res) => {
    const email = req.params.email;

    if (!email) {
        res.status(400).json({ error: 'email is required' });
        return
    }

    const user = await userService.getUserByEmail(email);
    res.json(user);
});

router.patch('/user/:id', async(
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

    // TODO : validate password and hash before saving to db.
    const user = await userService.updateUserPasswordById(id, password);
    res.json(user);
});

router.delete('/user/:id', async(
    req,
    res) => {
    const id = parseInt(req.params.id);
    const user = await userService.deleteUserById(id);
    res.json(user);
});

export default router;