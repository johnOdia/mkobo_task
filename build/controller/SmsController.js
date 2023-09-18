"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmsRepo_1 = require("../repository/SmsRepo");
const redis_1 = require("../config/redis");
class SmsController {
    recieveSms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { to, userId } = req.body;
                // Check if to parameter is present in account table
                const isToParamVerified = yield new SmsRepo_1.SmsRepo().verifyToParam(to, userId);
                if (isToParamVerified) {
                    res.status(200).json({
                        status: "ok",
                        message: "Inbound sms ok",
                        error: "",
                    });
                }
                else {
                    res.status(400).json({
                        status: "error",
                        message: "",
                        error: "To parameter not found",
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    status: "Unknown failure",
                    message: "Unknown failure",
                });
            }
        });
    }
    sendSms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { to, from, userId } = req.body;
                // If to and from param is present in redis cache, return error
                const key = to + from;
                const isPresentInCache = yield redis_1.client.get(key);
                if (isPresentInCache) {
                    res.status(400).json({
                        status: "error",
                        message: "",
                        error: "sms from " + from + " to " + to + " blocked by STOP request",
                    });
                }
                // Limit requests to 50 per 24 hours
                const rate = yield redis_1.client.get(from + to);
                if (rate && parseInt(rate) > 50) {
                    res.status(400).json({
                        status: "error",
                        message: "",
                        error: "limit reached for from " + from,
                    });
                }
                // Verify from param
                const isFromParamVerified = yield new SmsRepo_1.SmsRepo().verifyFromParam(from, userId);
                if (!isFromParamVerified) {
                    res.status(400).json({
                        status: "Error",
                        message: "",
                        error: "From parameter not found",
                    });
                }
                else
                    res.status(200).json({
                        status: "ok",
                        message: "Outbound sms ok",
                        error: "",
                    });
            }
            catch (err) {
                res.status(500).json({
                    status: "Unknown failure",
                    message: "Unknown failure",
                });
            }
        });
    }
}
exports.default = new SmsController();
