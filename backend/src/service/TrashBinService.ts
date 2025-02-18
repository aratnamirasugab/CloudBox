import {FileTrash} from "../database/model/FileTrash";
import {FileTrashRepository} from "../database/repositories/FileTrashRepository";
import {FolderTrash} from "../database/model/FolderTrash";
import {FolderTrashRepository} from "../database/repositories/FolderTrashRepository";
import {ViewTrashResponse} from "../model/ViewTrashResponse";
import {ObjectRestorationRequest} from "../model/ObjectRestorationRequest";
import {FolderRepository} from "../database/repositories/FolderRepository";
import {Folder} from "../database/model/Folder";
import {File} from "../database/model/File";
import {FileRepository} from "../database/repositories/FileRepository";
import {Transaction} from "sequelize";
import {ObjectRestorationResponse} from "../model/ObjectRestorationResponse";

const fileTrashRepository = new FileTrashRepository();
const folderTrashRepository = new FolderTrashRepository();
const folderRepository = new FolderRepository();
const fileRepository = new FileRepository();

export class TrashBinService {
    async getTrashesByUserId(userId: number): Promise<ViewTrashResponse> {
        // TODO : implement limit offset feature to reduce DB load.
        const fileTrashes: FileTrash[] = await fileTrashRepository.getTopLevelDeletedFiles(userId);
        const folderTrashes: FolderTrash[] = await folderTrashRepository.getTopLevelDeletedFolder(userId);
        return new ViewTrashResponse(fileTrashes, folderTrashes);
    }

    async restoreTrashesByUserId(userId: number, payload: ObjectRestorationRequest): Promise<ObjectRestorationResponse> {
        const responseRestoreFolder: ObjectRestorationResponse = await this.processRestoreFolders(userId, payload);
        const responseRestoreFile: ObjectRestorationResponse = await this.processRestoreFiles(userId, payload);

        return new ObjectRestorationResponse(
            responseRestoreFolder.impactedFileAmount + responseRestoreFile.impactedFileAmount,
            responseRestoreFolder.impactedFolderAmount
        );
    }

    private async processRestoreFiles(userId: number, payload: ObjectRestorationRequest):
        Promise<ObjectRestorationResponse> {

        if (!payload.fileTrashIds.length) {
            return;
        }

        const topLevelFileTrash: FileTrash[] = await fileTrashRepository.getTopLevelDeletedFiles(userId);
        const fileIdsOnTrash = new Set(topLevelFileTrash.map(file => file.fileId));

        const validFileIds = payload.fileTrashIds.filter(fileId => fileIdsOnTrash.has(fileId));

        if (validFileIds.length === 0) {
            return;
        }

        const transaction: Transaction = await File.sequelize.transaction();
        try {
            const [updatedFileTrashAmount] = await fileTrashRepository.restoreFileTrashByFileIds(
                userId, payload.fileTrashIds, transaction
            );
            if (updatedFileTrashAmount !== payload.fileTrashIds.length) {
                throw new Error('Failed to update the required File Trash!');
            }

            const [updatedFileAmount] = await fileRepository.restoreFileByFileIds(
                userId, payload.fileTrashIds, transaction
            );
            if (updatedFileAmount !== payload.fileTrashIds.length) {
                throw new Error('Failed to update the required File!');
            }

            await transaction.commit();
            return new ObjectRestorationResponse(updatedFileAmount, 0);
        } catch (error) {
            console.error("Restoration failed:", error);
            await transaction.rollback();
            throw new Error("Failed to restore files. Please try again.");
        }
    }

    private async processRestoreFolders(userId: number, payload: ObjectRestorationRequest):
        Promise<ObjectRestorationResponse> {

        if (!payload.folderTrashIds.length) {
            return;
        }

        const topLevelFolderTrash: FolderTrash[] = await folderTrashRepository.getTopLevelDeletedFolder(userId);
        const folderIdsOnTrash = new Set(topLevelFolderTrash.map(folder => folder.folderId));

        const validFolderIds = payload.folderTrashIds.filter(folderId => folderIdsOnTrash.has(folderId));

        if (validFolderIds.length === 0) {
            return;
        }

        // TODO : Can combine this 2 query into one??
        const subFolders: Folder[] = await folderRepository.getAllSubFoldersByFolderIds(validFolderIds, userId);
        const subFolderIds: number[] = subFolders.map(folder => folder.id);

        const files: File[] = await fileRepository.getFilesByMultipleFolderIds(subFolderIds, userId);
        const fileIds = files.map(file => file.id);

        const transaction: Transaction = await Folder.sequelize.transaction();
        try {

            const [updatedFolderTrashAmount] = await folderTrashRepository.restoreFolderTrashByFolderIds(
                userId, subFolderIds, transaction);
            if (updatedFolderTrashAmount !== subFolderIds.length) {
                throw new Error('Failed to update the required Folder Trash!');
            }

            const [updatedFolderAmount] = await folderRepository.restoreFolderByFolderIds(
                userId, subFolderIds, transaction);
            if (updatedFolderAmount !== subFolderIds.length) {
                throw new Error('Failed to update the required Folder!');
            }

            const [updatedFileTrashAmount] = await fileTrashRepository.restoreFileTrashByFileIds(
                userId, fileIds, transaction);
            if (updatedFileTrashAmount !== fileIds.length) {
                throw new Error('Failed to update the required File Trash!');
            }

            const [updatedFileAmount] = await fileRepository.restoreFileByFileIds(
                userId, fileIds, transaction);
            if (updatedFileAmount !== fileIds.length) {
                throw new Error('Failed to update the required File!');
            }

            await transaction.commit();
            return new ObjectRestorationResponse(updatedFileAmount, updatedFolderAmount);
        } catch (error) {
            console.error("Restoration failed:", error);
            await transaction.rollback();
            throw new Error("Failed to restore folders/files. Please try again.");
        }
    }
}