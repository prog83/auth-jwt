import { Entity, Column } from 'typeorm';
import { ValidateIf, IsNotEmpty, IsString, IsDate, MaxLength, IsEmail } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

import { ValidatorGroups as Groups } from 'helpers';

import AbstractModel from './Abstract.Model';

@Exclude()
@Entity({
  name: 'users',
  schema: 'auth',
})
export default class UserModel extends AbstractModel {
  @Expose()
  @Column({
    length: 32,
    unique: true,
  })
  @IsNotEmpty({ groups: Groups.all() })
  @IsString({ groups: Groups.all() })
  @MaxLength(32, { groups: Groups.all() })
  account!: string;

  // @Expose()
  // @Column({
  //   length: 60,
  // })
  // @IsNotEmpty({ groups: Groups.all() })
  // @IsString({ groups: Groups.all() })
  // @MaxLength(60, { groups: Groups.all() })
  // password!: string;

  @Expose()
  @Column({
    length: 50,
  })
  @IsNotEmpty({ groups: Groups.all() })
  @IsString({ groups: Groups.all() })
  @MaxLength(50, { groups: Groups.all() })
  lastName!: string;

  @Expose()
  @Column({
    length: 50,
  })
  @IsNotEmpty({ groups: Groups.all() })
  @IsString({ groups: Groups.all() })
  @MaxLength(50, { groups: Groups.all() })
  firstName!: string;

  @Expose()
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @ValidateIf((o) => !(o.middleName === null), { groups: Groups.all() })
  @IsNotEmpty({ groups: Groups.all() })
  @IsString({ groups: Groups.all() })
  @MaxLength(50, { groups: Groups.all() })
  middleName!: string | null;

  @Expose()
  @Type(() => Date)
  @Column('date')
  @IsNotEmpty({ groups: Groups.all() })
  @IsDate()
  birthday!: Date;

  @Column({
    type: 'int4',
    nullable: true,
  })
  age!: number | null;

  @Expose()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  @ValidateIf((o) => !(o.email === null), { groups: Groups.all() })
  @IsNotEmpty({ groups: Groups.all() })
  @IsEmail({ groups: Groups.all() })
  @MaxLength(50, { groups: Groups.all() })
  email!: string | null;

  @Expose()
  @Column({
    type: 'varchar',
    length: 12,
    unique: true,
    nullable: true,
  })
  @ValidateIf((o) => !(o.phone === null), { groups: Groups.all() })
  @IsNotEmpty({ groups: Groups.all() })
  @IsString({ groups: Groups.all() })
  @MaxLength(12, { groups: Groups.all() })
  phone!: string | null;

  @Expose()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  @ValidateIf((o) => !(o.mxid === null), { groups: Groups.all() })
  @IsNotEmpty({ groups: Groups.all() })
  @IsString({ groups: Groups.all() })
  @MaxLength(50, { groups: Groups.all() })
  mxid!: string | null;

  @Column({
    default: false,
  })
  isActivated!: boolean;

  @Column({
    nullable: true,
  })
  blockedAt!: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  blockedReason!: string;
}
