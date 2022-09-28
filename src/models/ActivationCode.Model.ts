import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import AbstractModel from './Abstract.Model';
import UserModel from './User.Model';

@Entity({
  name: 'activation_code',
  schema: 'auth',
})
export default class ActivationCodeModel extends AbstractModel {
  @Column('int')
  userId!: number;

  @OneToOne(() => UserModel)
  @JoinColumn()
  user!: UserModel;

  @Column({
    length: 36,
  })
  code!: string;
}
