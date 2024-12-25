export interface UploadSession {
    id : string,
    fileId : number,
    totalChunks : number,
    uploadedChunks : number,
    status : string,
    createdAt : number,
    updatedAt : number
}