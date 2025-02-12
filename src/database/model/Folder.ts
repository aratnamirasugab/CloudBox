import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {File} from "./File";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

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
    private _folders: Folder[];
    private _files: File[]

    constructor(folders: Folder[], files: File[]) {
        this._folders = folders;
        this._files = files;
    }

    get folders(): Folder[] {
        return this._folders;
    }

    set folders(value: Folder[]) {
        this._folders = value;
    }

    get files(): File[] {
        return this._files;
    }

    set files(value: File[]) {
        this._files = value;
    }
}