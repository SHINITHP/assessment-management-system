import mongoose, { Schema } from "mongoose";
import argon2 from "argon2";
import { IUser } from "../../types";

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    status: { type: String, enum: ["pending", "verified"], default: "pending" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function name(next) {
  if (this.isModified("password") && this.password) {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error: any) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function name(
  userPassword: string
): Promise<boolean> {
  try {
    return await argon2.verify(this.password, userPassword);
  } catch (error) {
    console.error("Error while comparing password:", error);
    return false;
  }
};

export const User = mongoose.model<IUser>("User", userSchema);
