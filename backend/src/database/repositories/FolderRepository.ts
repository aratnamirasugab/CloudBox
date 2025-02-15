import {CreateFolderDTO, Folder, UpdateFolderDTO} from "../model/Folder";
import {Op, QueryTypes, Transaction} from "sequelize";

export class FolderRepository {
    async getFolderById(id: number): Promise<Folder> {
        return await Folder.findByPk(id);
    }

    async createFolder(payload: CreateFolderDTO, userId: number): Promise<Folder> {
        return await Folder.create({
            parentFolderId: payload.parentFolderId,
            name: payload.name,
            userId: userId,
            createdAt: new Date()
        });
    }

    async getFoldersByParentFolderId(parentFolderId: number | undefined, userId: number): Promise<Folder[]> {
        return await Folder.findAll({
            where: {
                parentFolderId : parentFolderId ?? 0, // if not specified, then fetch root folder for userId
                userId : userId,
                isDeleted: false
            }
        })
    }

    async updateFolderByFolderId(payload: UpdateFolderDTO, userId: number):
        Promise<[affectedCount: number, affectedRows: Folder[]]> {
        return await Folder.update({
                ...(payload.name !== undefined && { name: payload.name } ),
                ...(payload.parentFolderId !== undefined && { parentFolderId : payload.parentFolderId })
            }, { returning: false, where: { id: payload.folderId, userId: userId} }
        )
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

    async getAllSubFolderIds(folderId: number,  userId: number): Promise<number[]> {
        const query: string = `
            WITH RECURSIVE folder_hierarchy AS (
                SELECT id FROM Folder WHERE id = :folderId, userId = :userId 
                UNION ALL
                SELECT f.id FROM Folder f INNER JOIN folder_hierarchy fh ON f.parent_folder_id = fh.id
            )
            SELECT id FROM folder_hierarchy
        `;

        const result = await Folder.sequelize.query(query, {
            replacements: { folderId, userId },
            type: QueryTypes.SELECT
        });

        return result.map(row => row.id);
    }

    async deleteFoldersWithIds(folderIds: number[], userId:number, transaction: Transaction | undefined):
        Promise<[affectedCount: number, affectedRows: Folder[]]> {
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
            transaction: transaction
        })
    }

    async getFolderWithIdUserId(folderId: number, userId: number): Promise<Folder> {
        return await Folder.findOne({
            where: {
                id: folderId,
                isDeleted: true,
                userId: userId
            } as any
        })

    }


}
