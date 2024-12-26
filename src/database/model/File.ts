import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface FileAttributes {
    id: number;
    folderId: number;
    userId: number;
    name: string;
    mimeType: string;
    size: number;
    uploadStatus: string;
    createdAt: Date;
    isDeleted: boolean;
    updatedAt: Date;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public id!: number;
    public folderId!: number;
    public userId!: number;
    public name!: string;
    public mimeType!: string;
    public size!: number;
    public uploadStatus!: string;
    public createdAt!: Date;
    public isDeleted!: boolean;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        File.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            folderId: {
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
            mimeType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            uploadStatus: {
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
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'File'
        });
    }
}

export function initializeFileTable(db: Sequelize) {
    File.initialize(db);
}

export default File;