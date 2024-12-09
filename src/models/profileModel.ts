import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  bio: string;
  education: string;
  workExperience: string;
  skills: string;
  portfolio: string;
  awards: string;
  image: string;
}

const ProfileSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    education: { type: String, required: true },
    workExperience: { type: String, required: true },
    skills: { type: String },
    portfolio: { type: String },
    awards: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);
