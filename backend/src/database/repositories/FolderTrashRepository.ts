import {FolderTrash} from "../model/FolderTrash";
import {CreateFolderTrashPayload} from "../../model/CreateFolderTrashPayload";
import {Op, QueryTypes, Transaction} from "sequelize";

export class FolderTrashRepository {

    async createMultipleFolderTrash(payloads: CreateFolderTrashPayload[], transaction: Transaction): Promise<void> {

        if (payloads.length === 0) return;

        await FolderTrash.bulkCreate(
            payloads.map((payload) => ({
                folderId: payload.folderId,
                parentFolderId: payload.parentFolderId,
                userId: payload.userId
            }))
        , {
            transaction : transaction
        });
    }

    async createFolderTrash(payload: CreateFolderTrashPayload, transaction: Transaction): Promise<void> {

        if (!payload) return;

        await FolderTrash.create(
            { folderId: payload.folderId, parentFolderId: payload.parentFolderId, userId: payload.userId}, 
            { transaction: transaction ?? null}
        );   
    }

    async getTopLevelDeletedFolder(userId: number): Promise<FolderTrash[]> {

        const query: string = `
            SELECT ft.* FROM FolderTrash ft
            LEFT JOIN FolderTrash parent_ft ON ft.parent_folder_id = parent_ft.folder_id
            WHERE parent_ft.folder_id IS NULL AND parent_ft.user_id = :userId AND ft.is_restored = false
        `;

        return await FolderTrash.sequelize.query(query, {
            replacements: {userId},
            type: QueryTypes.SELECT
        });
    }

    async restoreFolderTrashByFolderIds(userId: number, folderIds: number[], transaction: Transaction):
        Promise<[affectedCount: number, affectedRows: FolderTrash[]]> {
        return await FolderTrash.update({
            isRestored: true
        }, {
            returning: false,
            where: {
                folderId: {
                    [Op.in]: folderIds
                },
                userId: userId,
                isRestored: false
            },
            transaction: transaction ?? null
        })
    }

}