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
exports.initializeUploadSessionTable = initializeUploadSessionTable;
var sequelize_1 = require("sequelize");
var UploadSession = /** @class */ (function (_super) {
    __extends(UploadSession, _super);
    function UploadSession() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadSession.initialize = function (sequelize) {
        UploadSession.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            totalChunks: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            uploadedChunks: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize: sequelize,
            tableName: 'UploadSession'
        });
    };
    return UploadSession;
}(sequelize_1.Model));
function initializeUploadSessionTable(db) {
    UploadSession.initialize(db);
}
exports.default = UploadSession;
//# sourceMappingURL=UploadSession.js.map