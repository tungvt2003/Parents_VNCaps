import { BaseInterface } from "./base.interface";

export interface Student extends BaseInterface {
  admissionDate: Date;
  aliases: string;
  birthday: Date;
  name: string;
  nickname: string;
  image: string;
  class: Class;
}
export interface Class extends BaseInterface {
  name: string;
  group: string;
}
