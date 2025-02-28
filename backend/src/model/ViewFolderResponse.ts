import {Expose} from "class-transformer";

export class FolderResponseDTO {
    @Expose()
    id: number;
    @Expose()
    parentFolderId: number | null;
    @Expose()
    name: string;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
}

export class FileResponseDTO {
    @Expose()
    id: number;
    @Expose()
    folderId: number | null;
    @Expose()
    name: string;
    @Expose()
    mimeType: string;
    @Expose()
    size: number;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
}

export class ViewFolderResponse {
    folders: FolderResponseDTO[];
    files: FileResponseDTO[];

    constructor(folders: FolderResponseDTO[], files: FileResponseDTO[]) {
        this.folders = folders;
        this.files = files;
    }
}