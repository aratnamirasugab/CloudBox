import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    isDeleted: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    createdAt!: Date;
    email!: string;
    id!: number;
    isDeleted!: boolean;
    password!: string;

    public static initialize(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false
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

export default User;