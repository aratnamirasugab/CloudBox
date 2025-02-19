import {File, FileUploadingInitialization} from '../model/File';
import {Op, Transaction} from "sequelize";
import {Status} from "../../model/enum/Status";

export class FileRepository {
    async findById(id: number): Promise<File> {
        return await File.findByPk(id);
    }

    async create(payload: FileUploadingInitialization): Promise<File> {
        return await File.create({
            folderId: payload.folderId, userId: payload.userId, name: payload.name,
            mimeType: payload.mimeType, size: payload.size, uploadStatus: payload.uploadStatus,
            createdAt: payload.createdAt, isDeleted: payload.isDeleted
        });
    }

    async updateFileUploadStatusWithId(fileId: number, newUploadStatus: string)
            : Promise<[affectedCount: number, affectedRows: File[]]> {
        return await File.update({
            uploadStatus: newUploadStatus,
            updatedAt: new Date()
        }, {returning: true, where: {id: fileId}});
    }

    async updateWithFileId(fileId: number, file: File): Promise<[affectedCount: number, affectedRows: File[]]> {
        return await File.update(file, { returning: true, where: { id: fileId } });
    }

    async getFilesWithFolderId(folderId: number | undefined, userId: number): Promise<File[]> {
        return await File.findAll({
            where: {
                folderId: folderId ?? null,
                userId: userId,
                uploadStatus: Status.FINISHED.toString(),
                isDeleted: false
            }
        });
    }

    async getFilesWithKey(key: string, userId: number): Promise<File[]> {
        return await File.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${key}%`
                },
                userId: userId,
                uploadStatus: Status.FINISHED.toString(),
                isDeleted: false
            }
        })
    }

    async getFilesWithIdsUserIds(folderId: number, fileIds: number[], userId: number): Promise<File[]> {
        return await File.findAll({
            where: {
                id: {
                    [Op.in]: fileIds
                },
                folderId: folderId,
                userId: userId,
                uploadStatus: Status.FINISHED.toString(),
                isDeleted: false
            }
        })
    }

    async deleteFilesWithIds(fileIds: number[], folderId: number, transaction: Transaction | undefined)
        : Promise<[affectedCount: number, affectedRows: File[]]> {
        return await File.update({
            isDeleted: true,
            updatedAt: new Date()
        }, {
            returning: false,
            where: {
                id: {
                    [Op.in]: fileIds
                },
                isDeleted: false,
                folderId: folderId,
                uploadStatus: Status.FINISHED.toString()
            },
            transaction: transaction ?? null
        })
    }

    async deleteFilesWithFilesId(fileIds: number[], userId: number, transaction: Transaction | undefined)
        : Promise<[affectedCount: number, affectedRows: File[]]> {

        if (fileIds.length === 0) return;

        await File.update({
            isDeleted: true,
            updatedAt: new Date()
        }, {
            returning: false,
            where: {
                id: {
                    [Op.in]: fileIds
                },
                userId: userId,
                isDeleted: false
            },
            transaction: transaction ?? null
        })
    } 

    async getFilesIdByFolderId(folderId: number, userId: number): Promise<number[]> {
        const fileIds = await File.findAll({
            attributes: ['id'],
            where: {
                folderId: folderId,
                userId: userId,
                isDeleted: false,
                uploadStatus: Status.FINISHED.toString()
            },
            raw: true,
        })

        const resultFileIds: number[] = [];
        if (fileIds.length > 0) {
            resultFileIds.push(...fileIds.map(file => file.id));
        }

        return resultFileIds;
    }

    async getFilesByMultipleFolderIds(folderIds: number[], userId: number): Promise<File[]> {

        if (folderIds.length === 0) return [];

        return await File.findAll({
            where: {
                folderId: {
                    [Op.in]: folderIds
                },
                userId: userId,
                uploadStatus: Status.FINISHED.toString(),
                isDeleted: false 
            }
        })
    }

    async restoreFileByFileIds(userId: number, fileIds: number[], transaction: Transaction) {
        return await File.update({
            isDeleted: false,
            updatedAt: new Date()
        }, {
            returning: false,
            where: {
                id: {
                    [Op.in]: fileIds
                },
                userId: userId,
                isDeleted: true
            },
            transaction: transaction ?? null
        })
    }
}