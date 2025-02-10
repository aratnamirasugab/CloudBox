import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Status} from "../../model/enum/Status";

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

export class UploadSession extends Model<UploadSessionAttributes, UploadSessionCreationAttributes> implements UploadSessionAttributes {
    id!: number;
    fileId!: number;
    totalChunks!: number;
    uploadedChunks!: number;
    status!: string;
    updatedAt!: Date;
    createdAt!: Date;

    public static initialize(sequelize: Sequelize) {
        UploadSession.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            totalChunks: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            uploadedChunks: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'Upload_Session'
        })
    }
}

export function initializeUploadSessionTable(db : Sequelize) {
    UploadSession.initialize(db);
}

export class CreateUploadSession {
    private _fileId!: number;
    private _totalChunks!: number;
    private _uploadedChunks!: number;
    private _status!: string;
    private _createdAt!: Date;

    constructor(fileId: number, totalChunks: number) {
        this._fileId = fileId;
        this._totalChunks = totalChunks;
        this._uploadedChunks = 0;
        this._status = Status.INITIALIZED.toString();
        this._createdAt = new Date();
    }


    get fileId(): number {
        return this._fileId;
    }

    set fileId(value: number) {
        this._fileId = value;
    }

    get totalChunks(): number {
        return this._totalChunks;
    }

    set totalChunks(value: number) {
        this._totalChunks = value;
    }

    get uploadedChunks(): number {
        return this._uploadedChunks;
    }

    set uploadedChunks(value: number) {
        this._uploadedChunks = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }
}