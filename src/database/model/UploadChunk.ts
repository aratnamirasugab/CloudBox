import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface UploadChunkAttributes {
    id: number;
    fileId: number;
    chunkIndex: number;
    size: number;
    blobLink: string;
    isUploaded: boolean;
    checksum: string;
    uploadedAt: Date;
}

interface UploadChunkCreationAttributes extends Optional<UploadChunkAttributes, 'id'> {}

class UploadChunk extends Model<UploadChunkAttributes, UploadChunkCreationAttributes> implements UploadChunkAttributes {
    blobLink!: string;
    checksum!: string;
    chunkIndex!: number;
    fileId!: number;
    id!: number;
    isUploaded!: boolean;
    size!: number;
    uploadedAt!: Date;

    public static initialize(sequelize : Sequelize) {
        UploadChunk.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            chunkIndex: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            blobLink: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isUploaded: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            checksum: {
                type: DataTypes.STRING,
                allowNull: false
            },
            uploadedAt: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'UploadChunk'
        })
    }
}

export function initializeUploadChunkTable(db : Sequelize) {
    UploadChunk.initialize(db);
}

export default UploadChunk;