import {ChunkIdETag} from "../database/model/UploadChunk";

export class CloudStorageRequest {
    public key: string;
    public contentType: string;
    public uploadId: string;
    public chunkIdETag: ChunkIdETag[];

    constructor(params: Partial<CloudStorageRequest> = {}) {
        this.key = params.key || "";
        this.contentType = params.contentType || "";
        this.uploadId = params.uploadId || "";
        this.chunkIdETag = params.chunkIdETag || [];
    }
}