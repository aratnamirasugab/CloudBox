import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateFolderRequest {
    @IsNumber()
    @IsNotEmpty()
    folderId: number;

    parentFolderId: number | undefined;

    @IsString()
    name: string | undefined;
}