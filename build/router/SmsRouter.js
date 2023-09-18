"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const SmsController_1 = __importDefault(require("../controller/SmsController"));
const validate_1 = __importDefault(require("../helper/validate"));
const SmsSchema_1 = require("../schema/SmsSchema");
const authenticate_1 = __importDefault(require("../auth/authenticate"));
const cache_1 = __importDefault(require("../middlewares/cache"));
class SmsRoutes extends BaseRouter_1.default {
    routes() {
        /** INBOUND SMS ROUTE */
        this.router.post("/inbound/sms", (0, validate_1.default)(SmsSchema_1.phoneNumberSchema), (0, authenticate_1.default)(SmsSchema_1.accountSchema), cache_1.default.storeParams, SmsController_1.default.recieveSms);
        /** OUTBOUND SMS ROUTE */
        this.router.post("/outbound/sms", (0, validate_1.default)(SmsSchema_1.phoneNumberSchema), (0, authenticate_1.default)(SmsSchema_1.accountSchema), cache_1.default.rateLimit, SmsController_1.default.sendSms);
    }
}
exports.default = new SmsRoutes().router;
