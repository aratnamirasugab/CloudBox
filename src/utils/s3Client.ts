import {S3} from "aws-sdk";

export class S3Client {
    // TODO: get credentials from AWS Console.
    initializeS3(): S3 {
        return new S3({
            region: process.env.S3_REGION
        })
    }
}