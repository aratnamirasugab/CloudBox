import UploadChunk, {CreateUploadChunk} from "../model/UploadChunk";

export class UploadChunkRepository {

    async findById(id: number): Promise<UploadChunk> {
        return await UploadChunk.findByPk(id);
    }

    async createUploadChunk(chunk: CreateUploadChunk): Promise<UploadChunk> {
        return await UploadChunk.create(chunk);
    }

}