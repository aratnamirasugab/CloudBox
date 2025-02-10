import {User, UserCreation} from "../model/User";

export class UserRepository {
    async getUserByEmail(email: string): Promise<User> {
        return await User.findOne({
            where: {
                email: email
            }, rejectOnEmpty: undefined
        })
    }

    async createUser(userCreationPayload: UserCreation, password: string): Promise<User> {
        return await User.create({
            email: userCreationPayload.email,
            isDeleted: userCreationPayload.isDeleted,
            createdAt: userCreationPayload.createdAt,
            updatedAt: userCreationPayload.updatedAt,
            password: password
        })
    }
}