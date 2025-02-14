import {CreateUploadSession, UploadSession} from "../database/model/UploadSession";

class UploadSessionService {
    async createNewUploadSession(payload: CreateUploadSession): Promise<UploadSession> {
        return UploadSession.create(payload);
    }
}

export default UploadSessionService;