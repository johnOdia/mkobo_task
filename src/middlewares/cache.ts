import { NextFunction, Request, Response } from "express";
import { client } from "../config/redis";

class Cache {
  async storeParams(req: Request, res: Response, next: NextFunction) {
    try {
      const { to, from, text } = req.body;
      const key = to + from;

      let regexPattern = /^STOP$|^STOP\n$|^STOP\r$|^STOP\r\n$/;

      let isMatch = regexPattern.test(text);      

      if (isMatch) {
        client.setEx(key, 14400, JSON.stringify({ to, from }));
      }

      next();
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.log(message);
      next();
    }
  }

  async rateLimit(req: Request, res: Response, next: NextFunction) {
    try {
      const { to, from } = req.body;
      const key = from + to;

      const isPresentInCache = await client.get(key);

      if (isPresentInCache) {
        client.incr(key);
      } else {
        client.setEx(key, 86400, '1');
      }

      next();
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.log(message);
      next();
    }
  }
}

export default new Cache();
