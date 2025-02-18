export class CreateFolderTrashPayload {
    public folderId: number;
    public parentFolderId: number;
    public userId: number;

    constructor(params: CreateFolderTrashPayload) {
        this.folderId = params.folderId;
        this.parentFolderId = params.parentFolderId;
        this.userId = params.userId;
    }
}