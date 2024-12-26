import File from '../database/model/File';

class FileService {
    async createFile(folderId: number, userId: number, name: string,
                     mimeType: string, size: number) {
        return await File.create({
            folderId,
            userId,
            name,
            mimeType,
            size,
            uploadStatus: 'initialized',
            createdAt: new Date(),
            isDeleted: false
        });
    }

    async getFileById(id: number) {
        return await File.findByPk(id);
    }

    async updateFileById(id: number, folderId: number, userId: number,
                         name: string, mimeType: string, size: number,
                         uploadStatus: string, createdAt: Date, isDeleted: boolean) {
        return await File.update({
            folderId,
            userId,
            name,
            mimeType,
            size,
            uploadStatus,
            createdAt,
            isDeleted
        }, {
            where: {
                id
            }
        });
    }

    async deleteFileById(id: number) {
        return await File.update({
            isDeleted: true
        }, {
            where: {
                id
            }
        });
    }

    async getFilesByFolderId(folderId: number) {
        return await File.findAll({
            where: {
                folderId
            }
        });
    }
}

export default FileService;