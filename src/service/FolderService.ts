import {Folder, UpdateFolderDTO} from "../database/model/Folder";
import {FolderRepository} from "../database/repositories/FolderRepository";

const folderRepository = new FolderRepository();

export class FolderService {

    async updateFolderByFolderId(payload: UpdateFolderDTO, userId: number): Promise<void> {
        const folder: Folder = await folderRepository.getFolderById(payload.folderId);
        if (!folder) {
            console.warn(`Folder is not found ${payload.folderId}`);
            throw new Error('Internal Server Error');
        }

        if (userId !== folder.userId) {
            console.warn(`User id ${userId} trying to change folder Id ${folder.id}`);
            throw new Error('Internal Server Error');
        }

        const [affectedCount] = await folderRepository.updateFolderByFolderId(payload, userId);
        if (affectedCount === 0) {
            console.warn(`Folder is not updated properly ${folder.id}`);
            throw new Error('Internal Server Error');
        }
    }

    async getFolderByKey(key: string, userId: number): Promise<Folder[]> {

        if (!key) {
            return undefined;
        }

        return await folderRepository.getFolderByKey(key, userId);
    }

}