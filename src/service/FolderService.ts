import Folder from '../database/model/Folder';

class FolderService {
    async createFolder(name: string, userId: number) {
        return await Folder.create({
            name,
            userId,
            createdAt: new Date(),
            isDeleted: false
        });
    }

    async getFolderById(id: number) {
        return await Folder.findByPk(id);
    }

    async updateFolderById(id: number, name: string, userId: number,
                           parentFolderId: number, createdAt: Date, isDeleted: boolean) {
        return await Folder.update({
            name,
            userId,
            parentFolderId,
            createdAt,
            isDeleted
        }, {
            where: {
                id
            }
        });
    }

    async deleteFolderById(id: number) {
        return await Folder.update({
            isDeleted: true
        }, {
            where: {
                id
            }
        });
    }

    async getFoldersByParentFolderId(parentFolderId: number) {
        return await Folder.findAll({
            where: {
                parentFolderId
            }
        });
    }

    async getFoldersByUserId(userId: number) {
        return await Folder.findAll({
            where: {
                userId
            }
        });
    }

    async getRootFolderByUserId(userId: number) {
        return await Folder.findOne({
            where: {
                userId,
                parentFolderId: null
            }
        });
    }

    async getFolderByUserIdAndName(userId: number, name: string) {
        return await Folder.findOne({
            where: {
                userId,
                name
            }
        });
    }
}

export default FolderService;