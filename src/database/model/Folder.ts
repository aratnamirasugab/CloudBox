import {DataTypes, Model, Optional, Sequelize} from "sequelize";
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

class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes {
    id!: number;
    createdAt!: Date;
    isDeleted!: boolean;
    name!: string;
    parentFolderId!: number;
    userId!: number;

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

export default Folder;