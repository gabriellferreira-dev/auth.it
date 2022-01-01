import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity()
class User {
  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  nickname!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default User;
