export class ViewFolderResponse {
    folders: FolderResponse[];
    files: FileResponse[];

    constructor(folders: FolderResponse[], files: FileResponse[]) {
        this.folders = folders;
        this.files = files;
    }
}

export class FolderResponse {
    id: number;
    parentFolderId: number | null;
    name: string;
    createdAt: Date;

    constructor(id: number, parentFolderId: number | null, name: string, createdAt: Date) {
        this.id = id;
        this.parentFolderId = parentFolderId;
        this.name = name;
        this.createdAt = createdAt;
    }
}

export class FileResponse {
    id: number;
    folderId: number;
    name: string;
    mimeType: string;
    size: number;
    createdAt: Date;

    constructor(id: number, folderId: number, name: string, mimeType: string, size: number, createdAt: Date) {
        this.id = id;
        this.folderId = folderId;
        this.name = name;
        this.mimeType = mimeType;
        this.size = size;
        this.createdAt = createdAt;
    }
}
