import {CreateUserDTO, User} from "../database/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {

    async registerNewUser(userPayload : CreateUserDTO): Promise<User> {
        const existingUser = await this.getUserByEmail(userPayload.email);
        if (existingUser) {
            throw new Error('user already exists, please use another email');
        }

        const hashedPassword = await bcrypt.hash(userPayload.password, 10);
        if (!hashedPassword) {
            console.error('Failed to hash password : ' + userPayload.email);
            throw new Error();
        }

        const user = this.createUser(userPayload.email, hashedPassword);
        if (!user) {
            console.error('Failed to create user : ' + userPayload.email);
            throw new Error();
        }

        return user;
    }


    async loginUser(loginPayload : CreateUserDTO): Promise<string> {
        const user = await this.getUserByEmail(loginPayload.email);
        if (!user) {
            throw new Error('user is not exists');
        }

        const isPasswordValid : boolean = await bcrypt.compare(loginPayload.password, user.password);
        if (!isPasswordValid) {
            throw new Error('failed to login user');
        }

        const token : string = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        if (!token || token.length === 0) {
            throw new Error('failed to login user');
        }

        return token;
    }


    async createUser(email: string, password: string) {
        return await User.create({
            email,
            password,
            createdAt: new Date(),
        });
    }

    async getUserByEmail(email: string) {
        return await User.findOne({
            where: {
                email
            }
        });
    }
}

export default UserService;