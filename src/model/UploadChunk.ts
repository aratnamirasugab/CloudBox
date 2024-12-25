export interface UploadChunk {
    id : number,
    fileId : number,
    chunkIndex : number,
    size : number,
    blobLink : string,
    isUploaded : boolean,
    checksum : string,
    uploadedAt : number
}