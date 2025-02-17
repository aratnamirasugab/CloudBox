import {CloudProviderType} from "../model/enum/CloudProvider";
import {CloudStorageStrategy} from "../service/cloudStorage/CloudStorageStrategy";
import {AWSS3StorageStrategy} from "../service/cloudStorage/strategies/AWSS3StorageStrategy";
import {S3} from "aws-sdk";

export class CloudStorageFactory {
    static createStorage(type: CloudProviderType): CloudStorageStrategy {
        switch (type) {
            case CloudProviderType.AWS:
                const s3Client:S3 = new S3({
                    region: process.env.AWS_REGION,
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    }
                });

                const expiresInMs: number = process.env.AWS_S3_EXPIRY as unknown as number;
                return new AWSS3StorageStrategy(s3Client, process.env.AWS_S3_BUCKET_NAME, expiresInMs);
            default:
                throw new Error('Unsupported CloudProviderType');
        }
    }
}