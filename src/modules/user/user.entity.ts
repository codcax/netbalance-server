import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  username!: string;

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
