export class DeleteFolderResponse {
    folderAmount: number;
    fileAmount: number;

    constructor(folderAmount: number, fileAmount: number) {
        this.folderAmount = folderAmount;
        this.fileAmount = fileAmount;
    }
}