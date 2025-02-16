import {CloudStorageStrategy} from "./CloudStorageStrategy";
import {CloudStorageFactory} from "../../factories/CloudStorageFactory";
import {CloudProviderType} from "../../model/enum/CloudProvider";
import {CloudStorageRequest} from "../../model/CloudStorageRequest";
import {CloudStorageResponse} from "../../model/CloudStorageResponse";

export class CloudUploader {

    private strategy: CloudStorageStrategy;

    constructor(cloudProvider: CloudProviderType) {
        this.strategy = CloudStorageFactory.createStorage(cloudProvider);
    }

    async getSignedURLSingleUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        return await this.strategy.getSignedURLSingleUpload(param);
    }

    async createMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        return await this.strategy.createMultipartUpload(param);
    }

    async completeMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        return await this.strategy.completeMultipartUpload(param);
    }

    async abortMultipartUpload(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        return await this.strategy.abortMultipartUpload(param);
    }

    async deleteFile(param: CloudStorageRequest): Promise<CloudStorageResponse> {
        return await this.strategy.deleteFile(param);
    }

}