import { ValidateIf, IsNotEmpty, IsString, IsDate, Length, MaxLength, IsEmail } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

import { UserModel } from 'models';

@Exclude()
export default class SignupDto
  implements
    Pick<UserModel, 'account' | 'lastName' | 'firstName' | 'middleName' | 'birthday' | 'email' | 'phone' | 'mxid'>
{
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

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  lastName!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  firstName!: string;

  @Expose()
  @ValidateIf((o) => !(o.middleName === null))
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  middleName!: string | null;

  @Expose()
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  birthday!: Date;

  @Expose()
  @ValidateIf((o) => !(o.email === null))
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email!: string | null;

  @Expose()
  @ValidateIf((o) => !(o.phone === null))
  @IsNotEmpty()
  @IsString()
  @Length(12)
  phone!: string | null;

  @Expose()
  @ValidateIf((o) => !(o.mxid === null))
  @IsNotEmpty()
  @IsString()
  @Length(11, 50)
  mxid!: string | null;
}
