import {File, FileUploadingInitialization} from '../model/File';
import {S3Client} from "../../utils/s3Client";
import {CompleteMultipartUploadRequest, CreateMultipartUploadRequest} from "aws-sdk/clients/s3";
import {S3} from "aws-sdk";

const s3Client = new S3Client().initializeS3();

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

    /*
    * S3 Related-Queries
    * */
    async initiateMultipartUploadS3(contentType: string, key: string): Promise<S3.Types.CreateMultipartUploadOutput> {
        const params: CreateMultipartUploadRequest = {
            Bucket: process.env.S3_BUCKET as string,
            Key: key,
            ContentType: contentType
        };

        try {
            return await s3Client.createMultipartUpload(params).promise();
        } catch (err) {
            console.error(err);
            throw new Error('Internal Server Error');
        }
    }

    async completeMultipartUploadS3(request: CompleteMultipartUploadRequest)
        : Promise<S3.Types.CompleteMultipartUploadOutput> {
        try {
            const param = {
                Bucket: process.env.S3_BUCKET as string
            }

            return await s3Client.completeMultipartUpload(request).promise();
        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }
    }
}