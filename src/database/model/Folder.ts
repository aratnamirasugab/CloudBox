import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {FileResponse} from "./File";
import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

/*
 *  Response Utility
 */
export type FolderResponse = Omit<Folder, 'id' | 'userId' | 'isDeleted'>
/*
 * End of Response Utility
 */


interface FolderAttributes {
    id: number;
    parentFolderId: number;
    userId: number;
    name: string;
    createdAt: Date;
    isDeleted: boolean
}

interface FolderCreationAttributes extends Optional<FolderAttributes, 'id'> {}

export class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes {
    id!: number;
    parentFolderId!: number;
    userId!: number;
    name!: string;
    createdAt!: Date;
    isDeleted!: boolean;

    public static initialize(sequelize: Sequelize) {
        Folder.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            parentFolderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'Folder'
        });
    }
}

export function initializeFolderTable(db : Sequelize) {
    Folder.initialize(db);
}

export class CreateFolderDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    parentFolderId: number;
}

export class CreateFolderResponse {
    private readonly parentFolderId: number;
    private readonly folderId: number;

    constructor(folder: Folder) {
        this.parentFolderId = folder.parentFolderId;
        this.folderId = folder.id;
    }

    public getParentFolderId(): number {
        return this.parentFolderId;
    }

    public getFolderId(): number {
        return this.folderId;
    }
}

export class ViewFolderDTO {
    folderId: number | undefined;
}

export class ViewFolderResponse {
    private _folders: FolderResponse[];
    private _files: FileResponse[];

    constructor(folders: FolderResponse[], files: FileResponse[]) {
        this._folders = folders;
        this._files = files;
    }

    get folders(): FolderResponse[] {
        return this._folders;
    }

    set folders(value: FolderResponse[]) {
        this._folders = value;
    }

    get files(): FileResponse[] {
        return this._files;
    }

    set files(value: FileResponse[]) {
        this._files = value;
    }
}

export class UpdateFolderDTO {
    @IsNumber()
    @IsNotEmpty()
    folderId: number;

    @IsNumber()
    parentFolderId: number | undefined;

    @IsString()
    name: string | undefined;
}

export class DeleteFolderRequestDTO {
    @IsArray()
    @IsNotEmpty()
    folderId: number;
}

export class DeleteFolderResponseDTO {
    private folderAmount: number;
    private fileAmount: number;

    constructor(folderAmount: number, fileAmount: number) {
        this.folderAmount = folderAmount;
        this.fileAmount = fileAmount;
    }
}