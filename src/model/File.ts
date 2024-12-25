export interface File {
    id : number,
    folderId : number,
    userId : number,
    name : string,
    mimeType : string,
    size : number,
    uploadStatus : string,
    createdAt : number,
    isDeleted : boolean
}