import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Entity({
  name: 'staff_roles',
  schema: 'dict',
  synchronize: false,
})
export default class StaffRoleModel {
  @Expose()
  @PrimaryColumn('int2')
  id!: number;

  @Expose()
  @Column({
    length: 50,
  })
  label!: string;

  @Expose()
  @Column({
    length: 50,
  })
  alias!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
