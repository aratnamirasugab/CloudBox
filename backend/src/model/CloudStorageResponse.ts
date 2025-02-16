export class CloudStorageResponse {
    public preSignedURL: string;
    public uploadId: string;
    public location: string;
    public error: boolean;
    public errorMessage?: string;

    constructor(params: Partial<CloudStorageResponse> = {}) {
        this.preSignedURL = params.preSignedURL || "";
        this.uploadId = params.uploadId || "";
        this.location = params.location || "";
        this.error = params.error || false;
        this.errorMessage = params.errorMessage;
    }
}
