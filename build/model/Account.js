"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Account = class Account extends sequelize_typescript_1.Model {
};
exports.Account = Account;
Account.ACCOUNT_TABLE_NAME = "account";
Account.ACCOUNT_ID = "id";
Account.USERNAME = "username";
Account.AUTH_ID = "auth_id";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Account.ACCOUNT_ID,
    }),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(40),
        field: Account.AUTH_ID,
    }),
    __metadata("design:type", String)
], Account.prototype, "auth_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(30),
        field: Account.USERNAME,
    }),
    __metadata("design:type", String)
], Account.prototype, "username", void 0);
exports.Account = Account = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Account.ACCOUNT_TABLE_NAME,
    })
], Account);
