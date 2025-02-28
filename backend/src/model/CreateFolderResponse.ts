export class CreateFolderResponse {
    message: string;
    parentFolderId: number;
    folderId: number;

    constructor(message: string, parentFolderId: number, folderId: number) {
        this.parentFolderId = parentFolderId;
        this.folderId = folderId;
        this.message = message;
    }
}
