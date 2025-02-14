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
        }, { returning: true, where: {fileId: fileId} });
    }

    async findByFileId(fileId: number): Promise<UploadSession> {
        return await UploadSession.findOne({where: { fileId: fileId } as any});
    }

    async updateById(chunk: UploadSession, chunkId: number): Promise<[affectedCount: number]> {
        return await UploadSession.update(chunk, { where: { id: chunkId } as any });
    }
}