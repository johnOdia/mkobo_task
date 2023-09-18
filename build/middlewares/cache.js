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
const redis_1 = require("../config/redis");
class Cache {
    storeParams(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { to, from, text } = req.body;
                const key = to + from;
                let regexPattern = /^STOP$|^STOP\n$|^STOP\r$|^STOP\r\n$/;
                let isMatch = regexPattern.test(text);
                if (isMatch) {
                    redis_1.client.setEx(key, 14400, JSON.stringify({ to, from }));
                }
                next();
            }
            catch (error) {
                let message = "Unknown Error";
                if (error instanceof Error)
                    message = error.message;
                console.log(message);
                next();
            }
        });
    }
    rateLimit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { to, from } = req.body;
                const key = from + to;
                const isPresentInCache = yield redis_1.client.get(key);
                if (isPresentInCache) {
                    redis_1.client.incr(key);
                }
                else {
                    redis_1.client.setEx(key, 86400, '1');
                }
                next();
            }
            catch (error) {
                let message = "Unknown Error";
                if (error instanceof Error)
                    message = error.message;
                console.log(message);
                next();
            }
        });
    }
}
exports.default = new Cache();
