import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {IsEmail, IsString} from "class-validator";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    isDeleted: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    createdAt: Date;
    email: string;
    id: number;
    isDeleted: boolean;
    password: string;

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
                type: DataTypes.BOOLEAN
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