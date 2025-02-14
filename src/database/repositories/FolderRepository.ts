import {CreateFolderDTO, Folder, UpdateFolderDTO} from "../model/Folder";
import {Op} from "sequelize";

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


}
