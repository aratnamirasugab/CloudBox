import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface FolderTrashAttributes {
    id: number;
    folderId: number;
    parentFolderId: number;
    userId: number;
    createdAt: Date;
    isHardDeleted: boolean;
    isRestored: boolean;
}

interface FolderTrashCreationAttribute extends Optional<FolderTrashAttributes, 'id'> {}

export class FolderTrash extends Model<FolderTrashAttributes, FolderTrashCreationAttribute> implements FolderTrashAttributes {
    createdAt: Date;
    folderId: number;
    id: number;
    isHardDeleted: boolean;
    isRestored: boolean;
    parentFolderId: number;
    userId: number;

    public static initialize(sequelize: Sequelize) {
        FolderTrash.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            folderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            parentFolderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            isHardDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isRestored: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            sequelize,
            modelName: 'FolderTrash'
        })
    }
}

export function initializeFolderTrashTable(sequelize: Sequelize) {
    FolderTrash.initialize(sequelize);
}