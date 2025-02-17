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
                folderId: folderId ?? 0,
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

    async getFileWithIdsUserIds(folderId: number, fileIds: number[], userId: number): Promise<File[]> {
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
        : Promise<[affectedCount: number]> {
        return await File.update({
            isDeleted: true
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
            transaction: transaction
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

    async getFileWithIdUserId(fileId: number, userId: number): Promise<File> {
        return await File.findOne({
            where: {
                id: fileId,
                userId: userId,
                uploadStatus: Status.FINISHED.toString(),
                isDeleted: true
            } as any
        })
    }

    async getFilesWithUserIdRootLevel(userId: number): Promise<File[]> {
        return await File.findAll({
            where: {
                userId: userId,
                folderId: 0,
                uploadStatus: Status.FINISHED.toString(),
                isDeleted: true
            }
        })
    }
}