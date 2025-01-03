import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  location: string;
  blog: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  avatar_url: string;
  mutualFriends: string[];
  deleted: boolean;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  location: String,
  blog: String,
  bio: String,
  followers: Number,
  following: Number,
  public_repos: Number,
  public_gists: Number,
  avatar_url: String,
  mutualFriends: [String],
  deleted: { type: Boolean, default: false },
});

export const User = mongoose.model<IUser>("User", UserSchema);
