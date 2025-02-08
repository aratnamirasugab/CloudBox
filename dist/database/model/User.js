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
exports.initializeUserTable = initializeUserTable;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.initialize = function (sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            isDeleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize: sequelize,
            tableName: 'User'
        });
    };
    return User;
}(sequelize_1.Model));
function initializeUserTable(db) {
    User.initialize(db);
}
exports.default = User;
//# sourceMappingURL=User.js.map