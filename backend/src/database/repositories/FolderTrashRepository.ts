import {FolderTrash} from "../model/FolderTrash";
import {CreateFolderTrashPayload} from "../../model/CreateFolderTrashPayload";
import { QueryTypes, Transaction } from "sequelize";

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

        if (!payload || payload === undefined) return; 

        await FolderTrash.create(
            { folderId: payload.folderId, parentFolderId: payload.parentFolderId, userId: payload.userId}, 
            { transaction: transaction}
        );   
    }

    async getFolderTrashRootLevel(userId: number): Promise<FolderTrash[]> {

        const query: string = `
            SELECT ft.* FROM FolderTrash ft
            LEFT JOIN FolderTrash parent_ft ON ft.parent_folder_id = parent_ft.folder_id
            WHERE parent_ft.folder_id = 0, parent_ft.user_id = :userId
        `;

        const result: FolderTrash[] = await FolderTrash.sequelize.query(query, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });


        return result;
    }

}