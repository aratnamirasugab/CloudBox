import UploadSession from "../database/model/UploadSession";

class UploadSessionService {
    async createUploadSession(fileId: number, totalChunks: number, uploadedChunks: number, status: string) {
        return await UploadSession.create({
            fileId,
            totalChunks,
            uploadedChunks,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async getUploadSessionById(id: number) {
        return await UploadSession.findByPk(id);
    }

    async updateUploadSessionById(id: number, fileId: number, totalChunks: number, uploadedChunks: number, status: string) {
        return await UploadSession.update({
            fileId,
            totalChunks,
            uploadedChunks,
            status,
            updatedAt: new Date()
        }, {
            where: {
                id
            }
        });
    }

    async getUploadSessionByFileId(fileId: number) {
        return await UploadSession.findOne({
            where: {
                fileId
            }
        });
    }
}