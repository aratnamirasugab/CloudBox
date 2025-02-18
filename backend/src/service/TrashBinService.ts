import {FileTrash} from "../database/model/FileTrash";
import {FileTrashRepository} from "../database/repositories/FileTrashRepository";
import {FolderTrash} from "../database/model/FolderTrash";
import {FolderTrashRepository} from "../database/repositories/FolderTrashRepository";
import {ViewTrashResponse} from "../model/ViewTrashResponse";

const fileTrashRepository = new FileTrashRepository();
const folderTrashRepository = new FolderTrashRepository();

export class TrashBinService {
    async getTrashesByUserId(userId: number): Promise<ViewTrashResponse> {
        const fileTrashes: FileTrash[] = await fileTrashRepository.getTopLevelDeletedFiles(userId);
        const folderTrashes: FolderTrash[] = await folderTrashRepository.getTopLevelDeletedFolder(userId);
        return new ViewTrashResponse(fileTrashes, folderTrashes);
    }
}