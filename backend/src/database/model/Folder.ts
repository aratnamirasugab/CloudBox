import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface FolderAttributes {
    id: number;
    parentFolderId: number | null;
    userId: number;
    name: string;
    createdAt: Date;
    isDeleted: boolean
}

interface FolderCreationAttributes extends Optional<FolderAttributes, 'id'> {}

export class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes {
    id!: number;
    parentFolderId!: number | null;
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
                allowNull: true
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