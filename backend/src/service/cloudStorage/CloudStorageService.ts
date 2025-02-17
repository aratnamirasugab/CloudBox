import { CloudStorageStrategy } from "./CloudStorageStrategy";

export class CloudStorageService {

    private static strategy: CloudStorageStrategy

    constructor(strategy: CloudStorageStrategy) {
        if (!CloudStorageService.strategy) {
            CloudStorageService.strategy = strategy;
        }
    }

    static getStrategy(): CloudStorageStrategy {
        if (!CloudStorageService.getStrategy) {
            throw new Error('Internal Server Error');
        }

        return this.strategy;
    }

}