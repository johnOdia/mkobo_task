import { NextFunction, Request, Response } from "express";
import { Account } from "../model/Account";
import { AnyZodObject } from "zod";

const authenticate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        headers: req.headers,
      });
      const { username, auth_id } = req.headers;
      const user = await Account.findOne({
        where: { username, auth_id },
      });
      if (user) {
        req.body.userId = user.dataValues.id;
        return next();
      } else {
        return res.status(403).json({
          status: "Unauthorized!",
          message: "Unauthorized!",
        });
      }
    } catch (error) {
      let message = "Bad Request!";
      if (error instanceof Error) message = error.message;
      return res.status(400).json({
        status: "Bad Request!",
        message,
      });
    }
  };

export default authenticate;
