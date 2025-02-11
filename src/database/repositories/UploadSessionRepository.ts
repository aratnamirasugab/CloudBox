import {CreateUploadSession, UploadSession} from "../model/UploadSession";

export class UploadSessionRepository {
    async findById(id: number): Promise<UploadSession> {
        return await UploadSession.findByPk(id);
    }

    async create(uploadSession: CreateUploadSession): Promise<UploadSession> {
        return await UploadSession.create(uploadSession);
    }

    async updateChunkSessionStatusByFileId(fileId: number, newStatus: string) {
        return await UploadSession.update({
            fileId: fileId,
            status: newStatus,
            updatedAt: new Date(),
        }, { returning: true, where: {id: id} });
    }
}