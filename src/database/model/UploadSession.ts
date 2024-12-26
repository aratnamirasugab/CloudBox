import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface UploadSessionAttributes {
    id: number;
    fileId: number;
    totalChunks: number;
    uploadedChunks: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UploadSessionCreationAttributes extends Optional<UploadSessionAttributes, 'id'> {}

class UploadSession extends Model<UploadSessionAttributes, UploadSessionCreationAttributes> implements UploadSessionAttributes {
    createdAt!: Date;
    fileId!: number;
    id!: number;
    status!: string;
    totalChunks!: number;
    updatedAt!: Date;
    uploadedChunks!: number;

    public static initialize(sequelize: Sequelize) {
        UploadSession.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            totalChunks: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            uploadedChunks: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'UploadSession'
        })
    }
}

export function initializeUploadSessionTable(db : Sequelize) {
    UploadSession.initialize(db);
}

export default UploadSession;