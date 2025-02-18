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
    email: string;
    password: string;
    isDeleted: false;
    createdAt: Date;
    updatedAt: Date;

    constructor(createUserDTO: CreateUserDTO) {
        this.email = createUserDTO.email;
        this.password = createUserDTO.password;
        this.isDeleted = false;
        this.createdAt = new Date();
        this.updatedAt = undefined;
    }
}