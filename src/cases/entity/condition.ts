import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type ConditionDocument = HydratedDocument<Condition>;

@Schema({ collection: 'conditions', timestamps: true })
export class Condition {
  protected _id: ObjectId;

  @Prop({ unique: true })
  protected code: string;

  @Prop({})
  protected description: string;

  public constructor({ _id, code, description }: { _id?: ObjectId, code?: string, description?: string } = {}) {
    this._id = _id;
    this.code = code;
    this.description = description;
  }

  public getId(): string {
    return this._id.toString();
  }

  public getCode(): string {
    return this.code;
  }
}
export const ConditionSchema = SchemaFactory.createForClass(Condition);
