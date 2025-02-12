import {CreateFolderDTO, Folder} from "../model/Folder";

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
                parentFolderId : parentFolderId ?? 0,
                userId : userId,
                isDeleted: false
            }
        })
    }
}