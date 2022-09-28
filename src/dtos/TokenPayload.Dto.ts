import { UserModel } from 'models';
import type { MultiDictionary } from 'types/common';

export default class TokenPayloadDto {
  id: number;

  account: string;

  lastName: string;

  firstName: string;

  middleName: string | null;

  email: string | null;

  phone: string | null;

  mxid: string | null;

  constructor(model: UserModel, public permissions: MultiDictionary = []) {
    this.id = model.id;
    this.account = model.account;
    this.lastName = model.lastName;
    this.firstName = model.firstName;
    this.middleName = model.middleName;
    this.email = model.email;
    this.phone = model.phone;
    this.mxid = model.mxid;
  }
}
