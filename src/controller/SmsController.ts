import { Request, Response } from "express";
import { SmsRepo } from "../repository/SmsRepo";
import { client } from "../config/redis";

class SmsController {
  async recieveSms(req: Request, res: Response) {
    try {
      const { to, userId } = req.body;

      // Check if to parameter is present in account table
      const isToParamVerified = await new SmsRepo().verifyToParam(to, userId);

      if (isToParamVerified) {
        res.status(200).json({
          status: "ok",
          message: "Inbound sms ok",
          error: "",
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "",
          error: "To parameter not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "Unknown failure",
        message: "Unknown failure",
      });
    }
  }

  async sendSms(req: Request, res: Response) {
    try {
      const { to, from, userId } = req.body;

      // If to and from param is present in redis cache, return error
      const key = to + from;
      const isPresentInCache = await client.get(key);
      if (isPresentInCache) {
        res.status(400).json({
          status: "error",
          message: "",
          error: "sms from " + from + " to " + to + " blocked by STOP request",
        });
      }

      // Limit requests to 50 per 24 hours
      const rate = await client.get(from + to);

      if (rate && parseInt(rate) > 50) {
        res.status(400).json({
          status: "error",
          message: "",
          error: "limit reached for from " + from,
        });
      }

      // Verify from param
      const isFromParamVerified = await new SmsRepo().verifyFromParam(
        from,
        userId
      );

      if (!isFromParamVerified) {
        res.status(400).json({
          status: "Error",
          message: "",
          error: "From parameter not found",
        });
      } else
        res.status(200).json({
          status: "ok",
          message: "Outbound sms ok",
          error: "",
        });
    } catch (err) {
      res.status(500).json({
        status: "Unknown failure",
        message: "Unknown failure",
      });
    }
  }

  handleAll(req: Request, res: Response) {
    res.status(405).send("Method not allowed");
  }
}

export default new SmsController();
