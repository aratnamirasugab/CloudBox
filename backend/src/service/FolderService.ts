import {Folder} from "../database/model/Folder";
import {FolderRepository} from "../database/repositories/FolderRepository";
import {FileRepository} from "../database/repositories/FileRepository";
import {Transaction} from "sequelize";
import {FolderTrashRepository} from "../database/repositories/FolderTrashRepository";
import {CreateFolderTrashPayload} from "../model/CreateFolderTrashPayload";
import {FileTrashRepository} from "../database/repositories/FileTrashRepository";
import {CreateFileTrashPayload} from "../model/CreateFileTrashPayload";
import {File} from "../database/model/File";
import {FileResponseDTO, FolderResponseDTO, ViewFolderResponse} from "../model/ViewFolderResponse";
import {plainToInstance} from "class-transformer";
import {CreateFolderResponse} from "../model/CreateFolderResponse";
import {UpdateFolderRequest} from "../model/UpdateFolderRequest";
import {UpdateFolderResponse} from "../model/UpdateFolderResponse";
import {DeleteFolderResponse} from "../model/DeleteFolderResponse";

const folderRepository = new FolderRepository();
const fileRepository = new FileRepository();
const folderTrashRepository = new FolderTrashRepository();
const fileTrashRepository = new FileTrashRepository();

export class FolderService {

    async updateFolderByFolderId(payload: UpdateFolderRequest, userId: number): Promise<UpdateFolderResponse> {
        const folder: Folder = await folderRepository.getFolderById(payload.folderId);
        if (!folder) {
            console.warn(`Folder is not found ${payload.folderId}`);
            throw new Error('Folder not found');
        }

        if (userId !== folder.userId) {
            console.warn(`Unauthorized update attempt by user ${userId} on folder ${payload.folderId}`);
            throw new Error('Unauthorized');
        }

        if (folder.parentFolderId !== payload.parentFolderId) {
            console.warn(`Unauthorized update attempt by parentFolderId ${payload.parentFolderId} by user ${userId} on folder ${payload.folderId}`);
            throw new Error('Unauthorized');
        }

        const [affectedCount] = await folderRepository.updateFolderByFolderId(payload, userId);
        if (affectedCount === 0) {
            console.warn(`Folder is not updated properly ${folder.id}`);
            throw new Error('Internal Server Error');
        }

        return new UpdateFolderResponse(true, affectedCount);
    }

    async getFolderByKey(key: string, userId: number): Promise<Folder[]> {

        if (!key) {
            return undefined;
        }

        return await folderRepository.getFolderByKey(key, userId);
    }

    async deleteFolderById(folderId: number, userId: number): Promise<DeleteFolderResponse> {
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
                return new DeleteFolderResponse(1, deletedFileCount);
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
            return new DeleteFolderResponse(deletedFoldersCount, deletedFilesCount);
    
        } catch (error) {
            console.error(`Transaction failed for folderId: ${folderId}, userId: ${userId}. Error: `, error);
    
            // Rollback transaction on failure
            await transaction.rollback();
            throw new Error('Internal Server Error');
        }
    }

    async getFolderViewByFolderId(folderId: number | undefined,  userId: number): Promise<ViewFolderResponse> {

        if (!userId || userId <= 0) {
            throw new Error("Invalid Token");
        }

        try {
            // Fetch files and folders concurrently for performance
            type FolderViewResult = File[] | Folder[];
            const promises: Promise<FolderViewResult>[] = [
                fileRepository.getFilesWithFolderId(folderId, userId),
                folderRepository.getFoldersByParentFolderId(folderId, userId)
            ];

            const result = await Promise.all(promises);

            const files = result[0] as File[];
            const folders = result[1] as Folder[];

            const filteredFiles: FileResponseDTO[] = files?.length
                ? plainToInstance(FileResponseDTO, files, { excludeExtraneousValues: true })
                : [];

            const filteredFolders: FolderResponseDTO[] = folders?.length
                ? plainToInstance(FolderResponseDTO, folders, { excludeExtraneousValues: true })
                : [];

            return new ViewFolderResponse(filteredFolders, filteredFiles);
        } catch (error) {
            console.error(`Failed to fetch folder view for folderId: ${folderId}, userId: ${userId}`, error);
            throw new Error('Unable to retrieve folder view');
        }
    }

    async createANewFolder(rootFolderId: number | undefined, userId: number, folderName: string = "A New Folder") {

        if (!userId || userId <= 0) {
            throw new Error("Invalid Token");
        }

        try {
            const folder: Folder = await folderRepository.createFolder(rootFolderId, folderName, userId);
            if (!folder) {
                throw new Error('Failed when executing creat folder method');
            }

            return new CreateFolderResponse("Folder created", folder.parentFolderId, folder.id);
        } catch (error) {
            console.error(`Failed to create new folder for userId: ${userId} . rootFolderId: ${rootFolderId} .`, error);
            throw new Error('Unable to create new folder');
        }
    }

}