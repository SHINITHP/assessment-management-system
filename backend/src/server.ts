import express from 'express'
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from './config/db';
dotenv.config();

import userRoutes from './modules/user/user.routes'

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



app.use('/api/auth', userRoutes)

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`)
});
