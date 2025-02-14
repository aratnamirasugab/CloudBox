import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {IsEmail, IsString} from "class-validator";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    email: string;
    password: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;

    public static initialize(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: undefined
            }
        }, {
            sequelize,
            tableName: 'User'
        })
    }
}

export function initializeUserTable(db : Sequelize) {
    User.initialize(db);
}

export class CreateUserDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UserCreation {
    private _email: string;
    private _password: string;
    private _isDeleted: false;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(createUserDTO: CreateUserDTO) {
        this._email = createUserDTO.email;
        this._password = createUserDTO.password;
        this._isDeleted = false;
        this._createdAt = new Date();
        this._updatedAt = undefined;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get isDeleted(): false {
        return this._isDeleted;
    }

    set isDeleted(value: false) {
        this._isDeleted = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }
}