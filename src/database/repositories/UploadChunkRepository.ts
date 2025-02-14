import {CreateUploadChunk, UploadChunk} from "../model/UploadChunk";

export class UploadChunkRepository {

    async findById(id: number): Promise<UploadChunk> {
        return await UploadChunk.findByPk(id);
    }

    async createUploadChunk(chunk: CreateUploadChunk): Promise<UploadChunk> {
        return await UploadChunk.create(chunk);
    }

    async updateChunkById(chunk: UploadChunk, id: number):
            Promise<[affectedCount: number, affectedRows: UploadChunk[]]> {
        return await UploadChunk.update(chunk, {returning: true,  where: { chunkIndex: chunk.chunkIndex } });
    }

    async findByFileId(fileId: number): Promise<UploadChunk[]> {
        return await UploadChunk.findAll({ where: {fileId: fileId} } );
    }

}