import {DeleteFolderResponseDTO, Folder, UpdateFolderDTO} from "../database/model/Folder";
import {FolderRepository} from "../database/repositories/FolderRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {Transaction} from "sequelize";
import {FolderTrashRepository} from "../database/repositories/FolderTrashRepository";
import {CreateFolderTrashPayload} from "../model/CreateFolderTrashPayload";

const folderRepository = new FolderRepository();
const fileRepository = new FileRepository();
const folderTrashRepository = new FolderTrashRepository();

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
            for (const folderId of folderIds) {
                const fileIds: number[] = await fileRepository.getFilesIdByFolderId(folderId, userId);

                if (!fileIds || fileIds.length === 0) {
                    console.warn(`No files found for folder id: ${folderId}`);
                    continue; // skip to next iteration if no files are found
                }

                const [deletedFileAmount] = await fileRepository.deleteFilesWithIds(fileIds, folderId, transaction);
                filesDeleted += deletedFileAmount;

                // TODO : Change query to get folderId and its parentFolderId on the getAllSubFolderIds
                const [createdFolderTrashAmount] = await folderTrashRepository.createNewRow(new CreateFolderTrashPayload(
                    { folderId: folderId, userId:userId, parentFolderId: fo.der }
                ))
            }

            const [deletedFolderAmount] = await folderRepository.deleteFoldersWithIds(folderIds, userId, transaction);

            await transaction.commit();
            return new DeleteFolderResponseDTO(deletedFolderAmount, filesDeleted);
        } catch (error) {
            console.error('Transaction failed: ', error);

            // Rollback the transaction if any error occurs
            await transaction.rollback();

            throw new Error('Internal Server Error'); 
        }
    }

}