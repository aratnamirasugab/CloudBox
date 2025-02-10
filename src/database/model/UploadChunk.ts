import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface UploadChunkAttributes {
    id: number;
    fileId: number;
    chunkIndex: number;
    size: number;
    isUploaded: boolean;
    uploadedAt: Date;
}

interface UploadChunkCreationAttributes extends Optional<UploadChunkAttributes, 'id'> {}

class UploadChunk extends Model<UploadChunkAttributes, UploadChunkCreationAttributes> implements UploadChunkAttributes {
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
            isUploaded: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            uploadedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            }
        }, {
            sequelize,
            tableName: 'Upload_Chunk'
        })
    }
}

export function initializeUploadChunkTable(db : Sequelize) {
    UploadChunk.initialize(db);
}

export class CreateUploadChunk {
    private fileId: number;
    private chunkIndex: number;
    private size: number;
    private isUploaded: boolean;
    private uploadedAt: Date
    
    constructor(fileId: number, chunkIndex:n) {
    }
}

export default UploadChunk;