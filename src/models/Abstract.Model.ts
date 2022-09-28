import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

export default abstract class AbstractModel {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @CreateDateColumn()
  createdAt!: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt!: Date;
}
