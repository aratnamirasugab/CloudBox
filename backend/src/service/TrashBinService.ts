import {TrashBin, TrashItem} from "../database/model/TrashBin";

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
}