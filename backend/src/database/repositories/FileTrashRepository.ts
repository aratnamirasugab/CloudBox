import { QueryTypes, Transaction } from "sequelize";
import { FileTrash } from "../model/FileTrash";
import { CreateFileTrashPayload } from "../../model/CreateFileTrashPayload";

export class FileTrashRepository {
    async createMultipleFileTrash(payloads: CreateFileTrashPayload[], transaction: Transaction): Promise<void> {
        if (payloads.length === 0) return;

        await FileTrash.bulkCreate(payloads.map(payload => (
            {
                fileId: payload.fileId,
                folderId: payload.folderId,
                userId: payload.userId,   
                createdAt: new Date()
            }
        )), { transaction: transaction })
    }


    // TODO : revisit.
    async getFileTrashRootLevel(userId: number): Promise<FileTrash[]> {

        const query: string = `
            SELECT ft.* FROM FileTrash filet
            LEFT JOIN FolderTrash foldt ON filet.folder_id = foldt.folder_id
            WHERE filet.folder_id = 0, filet.user_id = :userId
        `;

        const result: FileTrash[] = await FileTrash.sequelize.query(query, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });


        return result;
    }
}