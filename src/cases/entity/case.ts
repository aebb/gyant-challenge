import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from '../../users/entity/user';
import { Condition } from './condition';

export type CaseDocument = HydratedDocument<Case>;

@Schema({ collection: 'cases', timestamps: true })
export class Case {
  protected _id: ObjectId;

  @Prop()
  protected electronicHealthRecord: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  protected doctor?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Condition' })
  protected condition?: Condition;

  @Prop()
  protected timeToLabel?: number;

  public constructor({
    _id, electronicHealthRecord, user, condition, timeToLabel,
  }: { _id?: ObjectId, electronicHealthRecord?:string, user?:User, condition?:Condition, timeToLabel?:number } = {}) {
    this._id = _id;
    this.electronicHealthRecord = electronicHealthRecord;
    this.doctor = user;
    this.condition = condition;
    this.timeToLabel = timeToLabel;
  }

  public getId(): string {
    return this._id.toString();
  }

  public getHealthRecord(): string {
    return this.electronicHealthRecord;
  }

  public getDoctor(): User {
    return this.doctor;
  }

  public getCondition(): Condition {
    return this.condition;
  }

  public getTime(): number {
    return this.timeToLabel;
  }

  public isOpen(): boolean {
    return this.condition == null;
  }

  public labelCase(doctor: User, condition: Condition, time: number): void {
    this.doctor = doctor;
    this.condition = condition;
    this.timeToLabel = time;
  }
}
export const CaseSchema = SchemaFactory.createForClass(Case);
CaseSchema.index({ createdAt: 1 }, { unique: false });
