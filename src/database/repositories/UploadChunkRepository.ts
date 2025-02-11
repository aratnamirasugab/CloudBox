import {CreateUploadChunk, UploadChunk} from "../model/UploadChunk";

export class UploadChunkRepository {

    async findById(id: number): Promise<UploadChunk> {
        return await UploadChunk.findByPk(id);
    }

    async createUploadChunk(chunk: CreateUploadChunk): Promise<UploadChunk> {
        return await UploadChunk.create(chunk);
    }

    async updateChunkStatus(chunk: UploadChunk, newStatus: boolean):
            Promise<[affectedCount: number, affectedRows: UploadChunk[]]> {
        return await UploadChunk.update({
            isUploaded: newStatus,
            uploadedAt: new Date()
        }, {returning: true,  where: { chunkIndex: chunk.chunkIndex } });
    }

}