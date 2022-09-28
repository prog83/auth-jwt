import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { UserModel } from 'models';

@Exclude()
export default class SigninDto implements Pick<UserModel, 'account'> {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  account!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  password!: string;
}
