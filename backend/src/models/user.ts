// User model 
import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    set: (password: string) => crypto.createHash('sha256').update(password).digest('hex'),
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'dataentry'],
    required: true,
  },
  additional_data: {
    type: String,
    default: '',
  },
});

export const User = mongoose.model('User', userSchema);
