import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface FileTrashAttributes {
    id: number;
    fileId: number;
    folderId: number;
    createdAt: Date;
    isHardDeleted: boolean;
    isRestored: boolean;
}

interface FileTrashCreationAttributes extends Optional<FileTrashAttributes, 'id'> {}

export class FileTrash extends Model<FileTrashAttributes, FileTrashCreationAttributes> implements FileTrashAttributes {
    createdAt: Date;
    fileId: number;
    folderId: number;
    id: number;
    isHardDeleted: boolean;
    isRestored: boolean;
    
    public static initialize(sequelize: Sequelize) {
        FileTrash.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            folderId: {
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
            modelName: 'FileTrash'
        })
    }
}

export function initializeFileTrashTable(sequelize: Sequelize) {
    FileTrash.initialize(sequelize);
}