export class BaseResponse {
    response: any;
    success: boolean;
    message: string;
    
    constructor(response: any, success: boolean, message: string) {
        this.response = response;
        this.success = success;
        this.message = message;
    }
}