import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch (error: any) {
    console.log(error)
    process.exit(1);
  }
};