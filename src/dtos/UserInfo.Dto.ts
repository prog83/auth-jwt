import { UserModel } from 'models';

export default class UserInfoDto {
  id: number;

  account: string;

  lastName: string;

  firstName: string;

  middleName: string | null;

  email: string | null;

  phone: string | null;

  mxid: string | null;

  // isActivated: boolean;

  constructor(model: UserModel) {
    this.id = model.id;
    this.account = model.account;
    this.lastName = model.lastName;
    this.firstName = model.firstName;
    this.middleName = model.middleName;
    this.email = model.email;
    this.phone = model.phone;
    this.mxid = model.mxid;
    // this.isActivated = model.isActivated;
  }
}
