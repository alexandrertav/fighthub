import mongoose, { Schema, Document, Types } from "mongoose";

export type PaymentStatus = "pending" | "approved" | "rejected" | "refunded";

export interface IPayment extends Document {
  _id: Types.ObjectId;
  registrationId: Types.ObjectId;
  amount: number;
  mpPreferenceId: string;
  mpPaymentId?: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    registrationId: { type: Schema.Types.ObjectId, required: true, index: true },
    amount: { type: Number, required: true },
    mpPreferenceId: { type: String, required: true },
    mpPaymentId: { type: String, index: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
