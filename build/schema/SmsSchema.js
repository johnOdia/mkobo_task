"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneNumberSchema = exports.accountSchema = void 0;
const zod_1 = require("zod");
exports.accountSchema = zod_1.z.object({
    headers: zod_1.z.object({
        username: zod_1.z
            .string()
            .min(4, { message: "Auth username must be greater than 4 characters!" }),
        auth_id: zod_1.z
            .string()
            .min(6, { message: "Auth id must be greater than 6 characters!" }),
    }),
});
exports.phoneNumberSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        from: zod_1.z
            .string()
            .min(6, { message: "From must be greater than 6 characters!" })
            .max(16, { message: "From must be less than 16 characters!" }),
        to: zod_1.z
            .string()
            .min(6, { message: "To must be greater than 6 characters!" })
            .max(16, { message: "To must be less than 16 characters!" }),
        text: zod_1.z
            .string()
            .min(1, { message: "Text must be greater than 1 character!" })
            .max(120, { message: "Text must be less than 120 characters!" }),
    })
        .partial(),
});
