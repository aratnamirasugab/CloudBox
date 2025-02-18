import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

interface UploadChunkAttributes {
    id: number;
    fileId: number;
    chunkIndex: number;
    size: number;
    eTag: string;
    isUploaded: boolean;
    uploadedAt: Date;
}

interface UploadChunkCreationAttributes extends Optional<UploadChunkAttributes, 'id'> {}

export class UploadChunk extends Model<UploadChunkAttributes, UploadChunkCreationAttributes> implements UploadChunkAttributes {
    id: number;
    fileId: number;
    chunkIndex: number;
    size: number;
    eTag: string;
    isUploaded: boolean;
    uploadedAt: Date;

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
            eTag: {
                type: DataTypes.STRING
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
    fileId: number;
    chunkIndex: number;
    size: number;
    isUploaded: boolean;
    uploadedAt: Date
    
    constructor(fileId: number, chunkIndex: number, size: number) {
        this.fileId = fileId;
        this.chunkIndex = chunkIndex;
        this.size = size;
        this.isUploaded = false;
        this.uploadedAt = new Date();
    }
}

export class CompleteUploadChunkDTO {
    @IsNotEmpty()
    @IsNumber()
    chunkIndex: number;

    @IsNotEmpty()
    @IsNumber()
    fileId: number;

    @IsNotEmpty()
    @IsString()
    etag: string;
}

export class CompleteUploadChunkResponse {
    fileId: number;
    chunkId: number[];
    message: string;

    constructor(fileId: number, chunkId: number[], message: string) {
        this.fileId = fileId;
        this.chunkId = chunkId;
        this.message = message;
    }
}

export class ChunkIdETag {
    partNumber: number;
    eTag: string;
}

export class FinishUploadAllChunkDTO {

    @IsNotEmpty()
    @IsArray()
    chunkIdETagList: ChunkIdETag[];

    @IsNotEmpty()
    @IsNumber()
    fileId: number;

    @IsNotEmpty()
    @IsString()
    fileName: string;

    @IsNotEmpty()
    @IsString()
    uploadId: string;
}