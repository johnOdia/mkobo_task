import { Phone } from "../model/PhoneNumber";
interface SmsRepository {
  verifyToParam(to: number, userId: string): Promise<boolean>;

  verifyFromParam(from: number, userId: string): Promise<boolean>;
}

export class SmsRepo implements SmsRepository {
  async verifyToParam(to: number, userId: string): Promise<boolean> {
    try {
      const isPhoneNumberPresent = await Phone.findOne({
        where: { number: to, account_id: userId },
      });
      return isPhoneNumberPresent ? true : false;
    } catch (error: unknown) {
      console.log(error);
      return false;
    }
  }

  async verifyFromParam(from: number, userId: string): Promise<boolean> {
    try {
      const isPhoneNumberPresent = await Phone.findOne({
        where: { number: from, account_id: userId },
      });
      return isPhoneNumberPresent ? true : false;
    } catch (error: unknown) {
      console.log(error);
      return false;
    }
  }
}
