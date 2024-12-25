export interface Folder {
    id : number,
    parentFolderId : number,
    userId : number,
    name : string,
    createdAt : number,
    isDeleted : boolean
}