import {DataTypes, Model, Optional, Sequelize} from "sequelize";

interface TrashBinAttributes {
    id: number;
    parentId: number;
    parentType: string;
    objectId: number;
    userId: number;
    name: string;
    type: string;
    createdAt: Date;
    isDeleted: boolean;
}

interface TrashBinCreationAttributes extends Optional<TrashBinAttributes, 'id'> {}

export class TrashBin extends Model<TrashBinAttributes, TrashBinCreationAttributes> implements TrashBinAttributes {
    id: number;
    parentType: string;
    parentId: number;
    objectId: number;
    userId: number;
    name: string;
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
            parentId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            parentType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            objectId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
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

export class TrashItem {
    id: number;
    name: string;
    type: string;
    parentId: number | null;
    children: TrashItem[];

    constructor(id: number, name: string, type: string, parentId: number | null, children: TrashItem[]) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.parentId = parentId;
        this.children = children;
    }
}