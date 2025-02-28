import {Folder} from "../model/Folder";
import {Op, QueryTypes, Transaction} from "sequelize";
import {UpdateFolderRequest} from "../../model/UpdateFolderRequest";

export class FolderRepository {
    async getFolderById(id: number): Promise<Folder> {
        return await Folder.findByPk(id);
    }

    async createFolder(parentFolderId: number | undefined, name: string, userId: number): Promise<Folder> {
        return await Folder.create(
            {
                parentFolderId: parentFolderId ?? null,
                name: name,
                userId: userId,
                createdAt: new Date()
            }, {
                returning: true
            });
    }

    async getFoldersByParentFolderId(parentFolderId: number | undefined, userId: number): Promise<Folder[]> {
        return await Folder.findAll({
            where: {
                parentFolderId : parentFolderId ?? null, // if not specified, then fetch root folder for userId
                userId : userId,
                isDeleted: false
            }
        })
    }

    async updateFolderByFolderId(
        payload: UpdateFolderRequest,
        userId: number
    ): Promise<[number]> {
        const updates: Partial<Folder> = {};
        if (payload.name !== undefined) updates.name = payload.name;
        if (payload.parentFolderId !== undefined) updates.parentFolderId = payload.parentFolderId;

        if (Object.keys(updates).length === 0) {
            throw new Error('No valid fields provided for update');
        }

        return await Folder.update(updates, {
            where: {
                id: payload.folderId,
                userId: userId
            },
            returning: false
        });
    }



    async getFolderByKey(key: string, userId: number): Promise<Folder[]> {
        return await Folder.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${key}%`
                },
                userId: userId,
                isDeleted: false
            }
        })
    }

    async getAllSubFoldersByFolderId(folderId: number,  userId: number): Promise<Folder[]> {
        const query: string = `
            WITH RECURSIVE folder_hierarchy AS (
                SELECT id, parent_folder_id FROM Folder WHERE id = :folderId AND userId = :userId 
                UNION ALL
                SELECT f.id, f.parent_folder_id FROM Folder f INNER JOIN folder_hierarchy fh ON f.parent_folder_id = fh.id
            )
            SELECT id, parent_folder_id FROM folder_hierarchy
        `;

        return await Folder.sequelize.query(query, {
            replacements: {folderId, userId},
            type: QueryTypes.SELECT
        });
    }

    async getAllSubFoldersByFolderIds(folderIds: number[], userId: number): Promise<Folder[]> {
        const query: string = `
            WITH RECURSIVE folder_hierarchy AS (
                SELECT id, parent_folder_id FROM Folder 
                WHERE id IN (:folderIds) AND userId = :userId
                UNION ALL
                SELECT f.id, f.parent_folder_id 
                FROM Folder f 
                INNER JOIN folder_hierarchy fh ON f.parent_folder_id = fh.id
            )
            SELECT id, parent_folder_id FROM folder_hierarchy
        `;

        return await Folder.sequelize.query(query, {
            replacements: { folderIds, userId },
            type: QueryTypes.SELECT
        });
    }


    async deleteFoldersWithIds(folderIds: number[], userId:number, transaction: Transaction | undefined):
        Promise<[number]> {
        return await Folder.update({
            isDeleted: true
        }, {
            returning: false,
            where: {
                id: {
                    [Op.in]: folderIds
                },
                userId: userId,
                isDeleted: false
            },
            transaction: transaction ?? null
        })
    }

    async restoreFolderByFolderIds(userId:number, folderIds: number[], transaction: Transaction):
        Promise<[number]>{
        return await Folder.update({
            isDeleted: false
        }, {
            returning: false,
            where: {
                userId: userId,
                id: {
                    [Op.in]: folderIds
                }
            },
            transaction: transaction ?? null
        })
    }
}
