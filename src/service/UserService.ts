import {CreateUserDTO, User} from "../database/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {

    async registerNewUser(userPayload : CreateUserDTO) {
        const existingUser = await this.getUserByEmail(userPayload.email);
        if (existingUser) {
            throw new Error('user already exists : ' + this.getUserByEmail);
        }

        const hashedPassword = await bcrypt.hash(userPayload.password, 10);
        if (!hashedPassword) {
            throw new Error('failed to hash password for user : ' + userPayload.email);
        }

        const user = this.createUser(userPayload.email, hashedPassword);
        if (!user) {
            throw new Error('failed to create user');
        }

        return user;
    }


    async loginUser(loginPayload : CreateUserDTO) {
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

    async getUserById(id: number) {
        return await User.findByPk(id);
    }

    async getUserByEmail(email: string) {
        return await User.findOne({
            where: {
                email
            }
        });
    }

    async updateUserPasswordById(id: number, password: string) {
        return await User.update({
            password
        }, {
            where: {
                id
            }
        });
    }

    async deleteUserById(id: number) {
        return await User.update({
            isDeleted: true
        }, {
            where: {
                id
            }
        });
    }
}

export default UserService;