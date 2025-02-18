import {FolderTrash} from "../model/FolderTrash";
import {CreateFolderTrashPayload} from "../../model/CreateFolderTrashPayload";

export class FolderTrashRepository {

    async createNewRow(payload: CreateFolderTrashPayload): Promise<FolderTrash> {
        return await FolderTrash.create({
            parentFolderId: payload.parentFolderId,
            userId: payload.userId,
            folderId: payload.folderId,
            createdAt: new Date(),
            isRestored: false,
            isHardDeleted: false
        });
    }

}