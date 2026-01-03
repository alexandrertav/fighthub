import mongoose, { Schema, Document, Types } from "mongoose";

export type Modality = "BOXE" | "MUAY_THAI";
export type EventStatus = "DRAFT" | "PUBLISHED" | "FINISHED";

export interface IEvent extends Document {
  _id: Types.ObjectId;
  promoterId: Types.ObjectId;
  slug: string;
  title: string;
  price: number;
  allowedModalities: Modality[];
  status: EventStatus;
  date?: Date;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    promoterId: { type: Schema.Types.ObjectId, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    allowedModalities: {
      type: [String],
      enum: ["BOXE", "MUAY_THAI"],
      default: ["BOXE", "MUAY_THAI"],
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "FINISHED"],
      default: "DRAFT",
    },
    date: { type: Date },
    location: { type: String },
  },
  { timestamps: true }
);

export const Event = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
