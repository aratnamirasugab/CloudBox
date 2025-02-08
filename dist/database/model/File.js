"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFileTable = initializeFileTable;
var sequelize_1 = require("sequelize");
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    File.initialize = function (sequelize) {
        File.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            folderId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            mimeType: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            uploadStatus: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            isDeleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize: sequelize,
            tableName: 'File'
        });
    };
    return File;
}(sequelize_1.Model));
function initializeFileTable(db) {
    File.initialize(db);
}
exports.default = File;
//# sourceMappingURL=File.js.map