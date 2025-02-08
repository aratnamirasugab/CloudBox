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
exports.initializeUploadChunkTable = initializeUploadChunkTable;
var sequelize_1 = require("sequelize");
var UploadChunk = /** @class */ (function (_super) {
    __extends(UploadChunk, _super);
    function UploadChunk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadChunk.initialize = function (sequelize) {
        UploadChunk.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fileId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            chunkIndex: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            size: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            blobLink: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            isUploaded: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            checksum: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            uploadedAt: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize: sequelize,
            tableName: 'UploadChunk'
        });
    };
    return UploadChunk;
}(sequelize_1.Model));
function initializeUploadChunkTable(db) {
    UploadChunk.initialize(db);
}
exports.default = UploadChunk;
//# sourceMappingURL=UploadChunk.js.map