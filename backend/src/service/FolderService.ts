import {DeleteFolderResponseDTO, Folder, UpdateFolderDTO} from "../database/model/Folder";
import {FolderRepository} from "../database/repositories/FolderRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {Transaction} from "sequelize";
import {FolderTrashRepository} from "../database/repositories/FolderTrashRepository";
import {CreateFolderTrashPayload} from "../model/CreateFolderTrashPayload";
import {FileTrashRepository} from "../database/repositories/FileTrashRepository";
import {CreateFileTrashPayload} from "../model/CreateFileTrashPayload";
import {File} from "../database/model/File";

const folderRepository = new FolderRepository();
const fileRepository = new FileRepository();
const folderTrashRepository = new FolderTrashRepository();
const fileTrashRepository = new FileTrashRepository();

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

    async deleteFolderById(folderId: number, userId: number): Promise<DeleteFolderResponseDTO> {
        const transaction: Transaction = await Folder.sequelize.transaction();
        try {
            // Fetch all subfolders in one query
            const subFolders: Folder[] = await folderRepository.getAllSubFoldersByFolderId(folderId, userId);
    
            // If no subfolders, check if the root folder itself should be deleted
            if (!subFolders || subFolders.length === 0) {
                console.warn(`No subfolders found. Deleting root folder. Root folder id: ${folderId}`);
    
                await folderTrashRepository.createFolderTrash(
                    new CreateFolderTrashPayload({ folderId: folderId, userId: userId, parentFolderId: null }),
                    transaction
                );
    
                const fileIds: number[] = await fileRepository.getFilesIdByFolderId(folderId, userId);
                await fileTrashRepository.createMultipleFileTrash(
                    fileIds.map(fileId => new CreateFileTrashPayload({ fileId, folderId, userId })),
                    transaction
                );
    
                const [deletedFileCount] = await fileRepository.deleteFilesWithIds(fileIds, folderId, transaction);
                await folderRepository.deleteFoldersWithIds([folderId], userId, transaction);
    
                await transaction.commit();
                return new DeleteFolderResponseDTO(1, deletedFileCount);
            }
    
            // Fetch all files in subfolders in one query
            const allFiles: File[] = await fileRepository.getFilesByMultipleFolderIds(
                subFolders.map(folder => folder.id),
                userId
            );
    
            // Move all subfolders and files to trash in batch
            await folderTrashRepository.createMultipleFolderTrash(
                subFolders.map(subFolder => new CreateFolderTrashPayload(
                    { 
                        folderId: subFolder.id, userId, parentFolderId: subFolder.parentFolderId 
                    })),
                transaction
            );
    
            await fileTrashRepository.createMultipleFileTrash(
                allFiles.map(file => new CreateFileTrashPayload(
                    { fileId: file.id, userId: userId, folderId: file.folderId }
                )), 
                transaction
            );
    
            // Delete all files first to prevent orphaned records
            const fileIdsForDeletion: number[] = allFiles.map(file => file.id);
            const [deletedFilesCount] = await fileRepository.deleteFilesWithFilesId(fileIdsForDeletion, userId, transaction);
    
            // Delete all folders
            const folderIdsForDeletion: number[] = subFolders.map(folder => folder.id);
            const [deletedFoldersCount] = await folderRepository.deleteFoldersWithIds(folderIdsForDeletion, userId, transaction);
    
            // Commit transaction
            await transaction.commit();
            return new DeleteFolderResponseDTO(deletedFoldersCount, deletedFilesCount);
    
        } catch (error) {
            console.error(`Transaction failed for folderId: ${folderId}, userId: ${userId}. Error: `, error);
    
            // Rollback transaction on failure
            await transaction.rollback();
            throw new Error('Internal Server Error');
        }
    }
}