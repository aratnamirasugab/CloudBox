import {IsNotEmpty, IsString} from "class-validator";

export class CreateFolderDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    parentFolderId: number;
}