export class CreateFileTrashPayload {
    public fileId: number;
    public folderId: number;
    public userId: number;

    constructor(params: CreateFileTrashPayload) {
        this.fileId = params.fileId;
        this.folderId = params.folderId;
        this.userId = params.userId;
    }
}