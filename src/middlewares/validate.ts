import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.message);
        
        const missingFields = error.issues.map((issue) => issue.path.join("."));
        res
          .status(400)
          .json({
            error: `${missingFields.join(", ")} is missing or invalid`,
          });
      } else {
        res.status(500).json({ error: "Unknown failure" });
      }
    }
  };

export default validate;
