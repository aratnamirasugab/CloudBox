import {DataTypes, Model, Optional, Sequelize} from 'sequelize';
import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Status} from "../../model/enum/Status";

/*
 *  Response Utility
 */
export type FileResponse = Omit<File, 'id' | 'updatedAt' | 'userId' | 'uploadStatus' | 'blobLink' | 'isDeleted'>
/*
 * End of Response Utility
 */


interface FileAttributes {
    id: number;
    folderId: number;
    userId: number;
    name: string;
    mimeType: string;
    size: number;
    uploadStatus: string;
    blobLink: string;
    createdAt: Date;
    isDeleted: boolean;
    updatedAt: Date;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

export class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public id!: number;
    public folderId!: number;
    public userId!: number;
    public name!: string;
    public mimeType!: string;
    public size!: number;
    public uploadStatus!: string;
    public blobLink!: string;
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
                allowNull: false,
                defaultValue: new Date().toString()
            },
            mimeType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            blobLink: {
                type: DataTypes.STRING
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
                defaultValue: false
            },
            updatedAt: {
                type: DataTypes.DATE
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

export class UploadFileDTO {
    @IsNotEmpty()
    @IsNumber()
    folderId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    mimeType: string;

    @IsNumber()
    @IsNotEmpty()
    size: number;

    @IsNumber()
    @IsNotEmpty()
    totalChunks: number;
}

export class FileUploadingInitiationResponse {
    private uploadId: string;
    private preSignURL: string;

    constructor(uploadId: string | undefined, preSignURL: string | undefined) {
        this.uploadId = uploadId;
        this.preSignURL = preSignURL;
    }

    public getUploadId(): string {
        return this.uploadId;
    }

    get preSignURL(): string {
        return this.preSignURL;
    }
}

export class FileUploadingInitialization {
    private _folderId: number;
    private _userId: number;
    private _name: string;
    private _mimeType: string;
    private _size: number;
    private _totalChunks: number;
    private _uploadStatus: string;
    private _createdAt: Date;
    private _isDeleted: boolean;

    constructor(uploadFileDTO: UploadFileDTO, userId: number) {
        this._folderId = uploadFileDTO.folderId;
        this._userId = userId;
        this._name = uploadFileDTO.name;
        this._mimeType = uploadFileDTO.mimeType;
        this._size = uploadFileDTO.size;
        this._totalChunks = uploadFileDTO.totalChunks;
        this._uploadStatus = Status.INITIALIZED.toString();
        this._createdAt = new Date();
        this._isDeleted = false;
    }


    get folderId(): number {
        return this._folderId;
    }

    set folderId(value: number) {
        this._folderId = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get mimeType(): string {
        return this._mimeType;
    }

    set mimeType(value: string) {
        this._mimeType = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    get uploadStatus(): string {
        return this._uploadStatus;
    }

    set uploadStatus(value: string) {
        this._uploadStatus = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    set isDeleted(value: boolean) {
        this._isDeleted = value;
    }

    get totalChunks(): number {
        return this._totalChunks;
    }

    set totalChunks(value: number) {
        this._totalChunks = value;
    }
}

export class DeleteFileRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    currentFolderId: number;

    @IsNotEmpty()
    @IsArray()
    fileIds: number[];
}