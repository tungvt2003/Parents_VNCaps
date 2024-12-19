import { BaseInterface } from "./base.interface";

export interface UserInfo extends BaseInterface {
  admissionDate: Date;
  aliases: string;
  birthday: Date;
}
