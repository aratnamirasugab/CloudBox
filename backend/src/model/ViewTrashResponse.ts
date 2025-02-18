import {FileTrash} from "../database/model/FileTrash";
import {FolderTrash} from "../database/model/FolderTrash";

export class ViewTrashResponse {
    fileTrashes: FileTrash[];
    folderTrashes: FolderTrash[];

    constructor(fileTrashes: FileTrash[], folderTrashes: FolderTrash[]) {
        this.fileTrashes = fileTrashes;
        this.folderTrashes = folderTrashes;
    }
}