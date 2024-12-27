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