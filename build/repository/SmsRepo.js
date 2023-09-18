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
exports.SmsRepo = void 0;
const PhoneNumber_1 = require("../model/PhoneNumber");
class SmsRepo {
    verifyToParam(to, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPhoneNumberPresent = yield PhoneNumber_1.Phone.findOne({
                    where: { number: to, account_id: userId },
                });
                return isPhoneNumberPresent ? true : false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    verifyFromParam(from, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPhoneNumberPresent = yield PhoneNumber_1.Phone.findOne({
                    where: { number: from, account_id: userId },
                });
                return isPhoneNumberPresent ? true : false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.SmsRepo = SmsRepo;
