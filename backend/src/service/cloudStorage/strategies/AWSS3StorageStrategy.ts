import {S3} from "aws-sdk";
import {CompletedPart, CompleteMultipartUploadRequest, CreateMultipartUploadRequest} from "aws-sdk/clients/s3";
import {CloudStorageRequest} from "../../../model/CloudStorageRequest";
import {CloudStorageStrategy} from "../CloudStorageStrategy";
import {CloudStorageResponse} from "../../../model/CloudStorageResponse";
import {ChunkIdETag} from "../../../database/model/UploadChunk";

export class AWSS3StorageStrategy implements CloudStorageStrategy {

    private s3Client: S3;
    private readonly bucketName: string;
    private readonly expiresInMs: number;

    constructor(s3Client: S3, bucketName: string, expiresInMs: number) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.expiresInMs = expiresInMs;
    }

    async getSignedURLSingleUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        const request = {
            Key: param.key,
            ContentType: param.contentType,
            Bucket: this.bucketName,
            Expires: this.expiresInMs
        };

        try {
            const output:string = await this.s3Client.getSignedUrlPromise("putObject", request);
            return new CloudStorageResponse({
                preSignedURL: output
            });
        } catch (error) {
            console.error("Error generating signed URL:", error);

            return new CloudStorageResponse({
                error: true,
                errorMessage: error instanceof Error ? error.message : String(error)
            });
        }
    }


    abortMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        return Promise.resolve(undefined);
    }

    async completeMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        try {
            const request: CompleteMultipartUploadRequest = {
                Key: param.key,
                Bucket: this.bucketName,
                UploadId: param.uploadId,
                MultipartUpload: {
                    Parts: this.generateCompletedParts(param.chunkIdETag)
                }
            };

            const output:S3.Types.CompleteMultipartUploadOutput =
                await this.s3Client.completeMultipartUpload(request).promise();
            return new CloudStorageResponse({
                location: output.Location
            })
        } catch (error) {
            console.error("Error generating signed URL:", error);

            return new CloudStorageResponse({
                error: true,
                errorMessage: error instanceof Error ? error.message : String(error)
            });
        }
    }

    private generateCompletedParts(partList: ChunkIdETag[]): CompletedPart[] {
        const completedPartList: CompletedPart[] = [];
        for (let i = 0 ; i < partList.length; i++) {
            completedPartList.push({
                ETag: partList[i].eTag, PartNumber: partList[i].partNumber
            })
        }
        return completedPartList;
    }

    async createMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {

        const request: CreateMultipartUploadRequest = {
            Bucket: this.bucketName,
            Key: param.key,
            ContentType: param.contentType
        };

        try {
            const output: S3.Types.CreateMultipartUploadOutput = await this.s3Client.createMultipartUpload(request).promise();
            return new CloudStorageResponse({
                uploadId: output.UploadId,
            })
        } catch (error) {
            console.error("Error generating signed URL:", error);

            return new CloudStorageResponse({
                error: true,
                errorMessage: error instanceof Error ? error.message : String(error)
            });
        }
    }

    deleteFile(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        return Promise.resolve(undefined);
    }


}