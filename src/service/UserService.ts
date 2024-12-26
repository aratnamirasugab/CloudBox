import User from "../database/model/User";

class UserService {
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

    async updateUserById(id: number, email: string, password: string) {
        return await User.update({
            email,
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