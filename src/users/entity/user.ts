import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Role } from './user.role';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  protected _id: ObjectId;

  @Prop({ unique: true })
  protected email: string;

  @Prop({})
  protected password: string;

  @Prop({})
  protected roles: Role[];

  public constructor({
    _id, email, password, roles,
  }: { _id?: ObjectId, email?: string, password?: string, roles?: Role[] } = {}) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}
export const UserSchema = SchemaFactory.createForClass(User);
