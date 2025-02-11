import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

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
    chunkIndex!: number;
    fileId!: number;
    id!: number;
    isUploaded!: boolean;
    size!: number;
    eTag!: string;
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
    private _fileId: number;
    private _chunkIndex: number;
    private _size: number;
    private _isUploaded: boolean;
    private _uploadedAt: Date
    
    constructor(fileId: number, chunkIndex: number, size: number) {
        this._fileId = fileId;
        this._chunkIndex = chunkIndex;
        this._size = size;
        this._isUploaded = false;
        this._uploadedAt = new Date();
    }

    get fileId(): number {
        return this._fileId;
    }

    set fileId(value: number) {
        this._fileId = value;
    }

    get chunkIndex(): number {
        return this._chunkIndex;
    }

    set chunkIndex(value: number) {
        this._chunkIndex = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    get isUploaded(): boolean {
        return this._isUploaded;
    }

    set isUploaded(value: boolean) {
        this._isUploaded = value;
    }

    get uploadedAt(): Date {
        return this._uploadedAt;
    }

    set uploadedAt(value: Date) {
        this._uploadedAt = value;
    }
}

export class CompleteUploadChunkDTO {
    @IsNotEmpty()
    @IsNumber()
    private _chunkIndex: number;

    @IsNotEmpty()
    @IsNumber()
    private _fileId: number;

    @IsNotEmpty()
    @IsString()
    private _etag: string;

    get chunkIndex(): number {
        return this._chunkIndex;
    }

    get fileId(): number {
        return this._fileId;
    }

    get etag(): string {
        return this._etag;
    }
}

export class CompleteUploadChunkResponse {
    private _fileId: number;
    private _chunkId: number;
    private _message: string;

    constructor(fileId: number, chunkId: number, message: string) {
        this._fileId = fileId;
        this._chunkId = chunkId;
        this._message = message;
    }

    get fileId(): number {
        return this._fileId;
    }

    set fileId(value: number) {
        this._fileId = value;
    }

    get chunkId(): number {
        return this._chunkId;
    }

    set chunkId(value: number) {
        this._chunkId = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}