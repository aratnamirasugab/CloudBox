import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface TrashBinAttributes {
    id: number;
    userId: number;
    objectId: number;
    type: string;
    createdAt: Date;
    isDeleted: boolean;
}

interface TrashBinCreationAttributes extends Optional<TrashBinAttributes, 'id'> {}

export class TrashBin extends Model<TrashBinAttributes, TrashBinCreationAttributes> implements TrashBinAttributes {
    id: number;
    userId: number;
    objectId: number;
    type: string;
    createdAt: Date;
    isDeleted: boolean;

    public static initialize(sequelize: Sequelize) {
        TrashBin.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            objectId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            modelName: 'TrashBin',
        })
    }
}

export function initializeTrashBinTable(sequelize: Sequelize) {
    TrashBin.initialize(sequelize);
}