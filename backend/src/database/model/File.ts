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
    folderId: number | null;
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
    public folderId!: number | null;
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
                defaultValue: null,
                allowNull: true
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
    uploadId: string;
    preSignURL: string;

    constructor(uploadId: string | undefined, preSignURL: string | undefined) {
        this.uploadId = uploadId;
        this.preSignURL = preSignURL;
    }
}

export class FileUploadingInitialization {
    folderId: number;
    userId: number;
    name: string;
    mimeType: string;
    size: number;
    totalChunks: number;
    uploadStatus: string;
    createdAt: Date;
    isDeleted: boolean;

    constructor(uploadFileDTO: UploadFileDTO, userId: number) {
        this.folderId = uploadFileDTO.folderId;
        this.userId = userId;
        this.name = uploadFileDTO.name;
        this.mimeType = uploadFileDTO.mimeType;
        this.size = uploadFileDTO.size;
        this.totalChunks = uploadFileDTO.totalChunks;
        this.uploadStatus = Status.INITIALIZED.toString();
        this.createdAt = new Date();
        this.isDeleted = false;
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