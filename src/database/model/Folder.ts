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
    public id!: number;
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
                allowNull: false
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false
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
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    parentFolderId: number;
}

export default Folder;