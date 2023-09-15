// Database utility 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto'; 
import { User } from '../models/user'; 

dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } = process.env;

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

export const createDefaultUser = async () => {
  const userExists = await User.findOne({ username: 'root' });
  if (!userExists) {
    const hashedPassword = crypto.createHash('sha256').update('0f6c4315').digest('hex');
    const rootUser = new User({
      username: 'root',
      password: hashedPassword,
      name: 'Root User',
      role: 'admin',
    });
    await rootUser.save();
    console.log('Root user created successfully');
  }
};
  
  
export const connectDB:any = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
    createDefaultUser();
  } catch (error:any) {
    console.error('Error connecting to MongoDB', error);
  }
};
