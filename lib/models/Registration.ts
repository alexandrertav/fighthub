import mongoose, { Schema, Document, Types } from "mongoose";

export type RegistrationStatus = "PENDING_PAYMENT" | "PAID" | "REFUNDED" | "CANCELED";
export type MatchStatus = "SEM_LUTA" | "LUTA_SUGERIDA" | "LUTA_CONFIRMADA";
export type Level = "AMADOR" | "SEMI_PRO";
export type Modality = "BOXE" | "MUAY_THAI";

export interface IRegistration extends Document {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  fullName: string;
  age: number;
  weight: number;
  height: number;
  totalFights: number;
  recordNotes?: string;
  team: string;
  level: Level;
  modality: Modality;
  status: RegistrationStatus;
  matchStatus: MatchStatus;
  paymentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    eventId: { type: Schema.Types.ObjectId, required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    weight: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 },
    totalFights: { type: Number, required: true, min: 0, default: 0 },
    recordNotes: { type: String, trim: true },
    team: { type: String, required: true, trim: true },
    level: { type: String, enum: ["AMADOR", "SEMI_PRO"], required: true },
    modality: { type: String, enum: ["BOXE", "MUAY_THAI"], required: true },
    status: {
      type: String,
      enum: ["PENDING_PAYMENT", "PAID", "REFUNDED", "CANCELED"],
      default: "PENDING_PAYMENT",
    },
    matchStatus: {
      type: String,
      enum: ["SEM_LUTA", "LUTA_SUGERIDA", "LUTA_CONFIRMADA"],
      default: "SEM_LUTA",
    },
    paymentId: { type: Schema.Types.ObjectId, index: true },
  },
  { timestamps: true }
);

export const Registration =
  mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);
