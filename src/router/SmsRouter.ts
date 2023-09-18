import BaseRoutes from "./base/BaseRouter";
import SmsController from "../controller/SmsController";
import validate from "../middlewares/validate";
import { phoneNumberSchema, accountSchema } from "../schema/SmsSchema";
import authenticate from "../middlewares/authenticate";
import cache from "../middlewares/cache";


class SmsRoutes extends BaseRoutes {
  public routes(): void {
    /** INBOUND SMS ROUTE */
    this.router.post(
      "/inbound/sms",
      validate(phoneNumberSchema),
      authenticate(accountSchema),
      cache.storeParams,
      SmsController.recieveSms
    )

    /** OUTBOUND SMS ROUTE */
    this.router.post(
      "/outbound/sms",
      validate(phoneNumberSchema),
      authenticate(accountSchema),
      cache.rateLimit,
      SmsController.sendSms
    );

    /** INVALID METHOD ERROR HANDLING */
    this.router.all('/inbound/sms', SmsController.handleAll);
    this.router.all('/outbound/sms', SmsController.handleAll);
  }
}

export default new SmsRoutes().router;
