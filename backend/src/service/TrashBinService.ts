import {TrashBin, TrashItem} from "../database/model/TrashBin";
import { FileRepository } from "../database/repositories/FileRepository";
import { FolderRepository } from "../database/repositories/FolderRepository";
import {TrashBinRepository} from "../database/repositories/TrashBinRepository";
import { RestoreTrashResponse } from "../model/RestoreTrashResponse";
import { File } from "../database/model/File";
import { Folder } from "../database/model/Folder";

const trashBinRepository = new TrashBinRepository();
const fileRepository = new FileRepository();
const folderRepository = new FolderRepository();

export class TrashBinService {

    async getTrashesByUserId(userId: number): Promise<TrashItem[]> {

        const trashBinMap: Map<string, TrashItem> = new Map();
        const trashes: TrashBin[] = await trashBinRepository.getTrashesByUserId(userId);
        trashes.forEach(trash => {
            const trashItem: TrashItem = new TrashItem(trash.id, trash.name, trash.type, trash.parentId, []);
            trashBinMap.set(`${trash.type}_${trash.id}`, trashItem);
        })

        const rootFolder: TrashItem[] = [];
        trashes.forEach(trash => {
            if (trash.parentId !== null) {
                const parentTrash: TrashItem = trashBinMap.get(`folder_${trash.parentId}`);
                if (parentTrash) {
                    parentTrash.children.push(trashBinMap.get(`${trash.type}_${trash.id}`));
                }
            } else {
                rootFolder.push(trashBinMap.get(`${trash.type}_${trash.id}`));
            }
        })

        return rootFolder;
    }

    async restoreTrash(userId: number, trashIds: number[]): Promise<RestoreTrashResponse> {
        

        const trashes: TrashBin[] = await trashBinRepository.getTrashByUserIdRootLevel(userId);
        const files: File[] = await fileRepository.getFilesWithUserIdRootLevel(userId);
        const folders: Folder[] = await folderRepository


    

    }
}