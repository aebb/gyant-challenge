import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './user.role';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ unique: true })
  protected email: string;

  @Prop({})
  protected password: string;

  @Prop({})
  protected roles: Role[];

  constructor({ email, password, roles }: { email?: string, password?: string, roles?: Role[] } = {}) {
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  public getPassword(): string {
    return this.password;
  }
}
export const UserSchema = SchemaFactory.createForClass(User);
