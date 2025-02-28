import {IsArray, IsNotEmpty} from "class-validator";

export class DeleteFolderRequest {
    @IsArray()
    @IsNotEmpty()
    folderId: number;
}