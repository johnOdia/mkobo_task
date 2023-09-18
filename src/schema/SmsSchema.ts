import { z } from "zod";

export const accountSchema = z.object({
  headers: z.object({
    username: z
      .string()
      .min(4, { message: "Auth username must be greater than 4 characters!" }),
    auth_id: z
      .string()
      .min(6, { message: "Auth id must be greater than 6 characters!" }),
  }),
});

export const phoneNumberSchema = z.object({
  body: z
    .object({
      from: z
        .string()
        .min(6, { message: "From must be greater than 6 characters!" })
        .max(16, { message: "From must be less than 16 characters!" }),
      to: z
        .string()
        .min(6, { message: "To must be greater than 6 characters!" })
        .max(16, { message: "To must be less than 16 characters!" }),
      text: z
        .string()
        .min(1, { message: "Text must be greater than 1 character!" })
        .max(120, { message: "Text must be less than 120 characters!" }),
    })
});
