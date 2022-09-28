import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import AbstractModel from './Abstract.Model';
import UserModel from './User.Model';

@Entity({
  name: 'tokens',
  schema: 'auth',
})
export default class TokenModel extends AbstractModel {
  @Column('int')
  userId!: number;

  @OneToOne(() => UserModel)
  @JoinColumn()
  user!: UserModel;

  @Column('text')
  refreshToken!: string;

  @Column()
  expires!: Date;
}
