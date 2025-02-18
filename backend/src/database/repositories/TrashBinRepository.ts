import {TrashBin} from "../model/TrashBin";
import {ObjectType} from "../../model/enum/ObjectType";

export class TrashBinRepository {

    async getTrashesByUserId(userId: number): Promise<TrashBin[]> {
        return await TrashBin.findAll({
            where: {
                userId: userId,
                isDeleted: false
            }
        })
    }
    async getTrashByUserIdRootLevel(userId: number): Promise<TrashBin[]> {
        return await TrashBin.findAll({
            where: {
                userId: userId,
                parentId: 0,
                isDeleted: false
            }
        })
    }

}