import {CloudStorageResponse} from "../../model/CloudStorageResponse";
import {CloudStorageRequest} from "../../model/CloudStorageRequest";

export interface CloudStorageStrategy {
    getSignedURLSingleUpload(param: CloudStorageRequest): Promise<CloudStorageResponse>;
    createMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse>;
    completeMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse>;
    abortMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse>;
    deleteFile(param: CloudStorageRequest): Promise<CloudStorageResponse>;
}