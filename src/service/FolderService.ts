import Folder, {CreateFolderDTO} from '../database/model/Folder';

class FolderService {

    async createFolder(createFolderPayload: CreateFolderDTO, userId: number) {
        return await Folder.create({
            parentFolderId: createFolderPayload.parentFolderId,
            name: createFolderPayload.name,
            userId: userId,
            createdAt: new Date()
        });
    }
}

export default FolderService;