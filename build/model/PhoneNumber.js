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
exports.Phone = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Phone = class Phone extends sequelize_typescript_1.Model {
};
exports.Phone = Phone;
Phone.PHONE_TABLE_NAME = "phone_number";
Phone.PHONE_ID = "id";
Phone.NUMBER = "number";
Phone.ACCOUNT_ID = "account_id";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Phone.PHONE_ID,
    }),
    __metadata("design:type", Number)
], Phone.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(40),
        field: Phone.ACCOUNT_ID,
    }),
    __metadata("design:type", String)
], Phone.prototype, "auth_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Phone.NUMBER,
    }),
    __metadata("design:type", Number)
], Phone.prototype, "username", void 0);
exports.Phone = Phone = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Phone.PHONE_TABLE_NAME,
    })
], Phone);
