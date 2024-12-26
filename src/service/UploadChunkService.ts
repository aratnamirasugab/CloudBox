import UploadChunk from "../database/model/UploadChunk";

class UploadChunkService {
    async createUploadChunk(fileId: number, chunkIndex: number, size: number,
                            blobLink: string, isUploaded: boolean, checksum: string) {
        return await UploadChunk.create({
            fileId,
            chunkIndex,
            size,
            blobLink,
            isUploaded,
            checksum,
            uploadedAt: new Date()
        });
    }

    async getUploadChunkById(id: number) {
        return await UploadChunk.findByPk(id);
    }

    async updateUploadChunkById(id: number, fileId: number, chunkIndex: number,
                                size: number, blobLink: string, isUploaded: boolean,
                                checksum: string, uploadedAt: Date) {
        return await UploadChunk.update({
            fileId,
            chunkIndex,
            size,
            blobLink,
            isUploaded,
            checksum,
            uploadedAt
        }, {
            where: {
                id
            }
        });
    }
    async getUploadChunksByFileId(fileId: number) {
        return await UploadChunk.findAll({
            where: {
                fileId
            }
        });
    }
}