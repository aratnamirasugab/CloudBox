import {DeleteFolderResponseDTO, Folder, UpdateFolderDTO} from "../database/model/Folder";
import {FolderRepository} from "../database/repositories/FolderRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {Sequelize, Transaction} from "sequelize";

const folderRepository = new FolderRepository();
const fileRepository = new FileRepository();

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

    async deleteFolderByIds(folderId: number, userId: number): Promise<DeleteFolderResponseDTO> {
        const folderIds: number[] = await folderRepository.getAllSubFolderIds(folderId, userId);

        if (!folderIds || folderIds.length === 0) {
            console.warn(`No subfolders found for root folder id. root folder id : ${folderId}`);
            throw new Error('Internal Server Error');
        }

        const transaction: Transaction = await Folder.sequelize.transaction();
        try {
            let filesDeleted: number = 0;
            for (const folderId:number of folderIds) {
                const fileIds: number[] = await fileRepository.getFilesIdByFolderId(folderId, userId);

                if (!fileIds || fileIds.length === 0) {
                    console.warn(`No files found for folder id: ${folderId}`);
                    continue; // skip to next iteration if no files are found
                }

                const [affectedCount] = await fileRepository.deleteFilesWithIds(fileIds, folderId, transaction);
                filesDeleted += affectedCount;
            }
            const [affectedCount] = await folderRepository.deleteFoldersWithIds(folderIds, userId, transaction);
            await transaction.commit();
            return new DeleteFolderResponseDTO(affectedCount, filesDeleted);
        } catch (error) {
            console.error('Transaction failed: ', error);

            // Rollback the transaction if any error occurs
            await transaction.rollback();

            throw new Error('Internal Server Error');
        }
    }

}