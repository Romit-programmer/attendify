import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/attendify';

export async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { dbName: 'attendify' });
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.warn('MongoDB connection failed, falling back to in-memory store:', err.message);
    return false;
  }
}

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  token: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);

// In-memory fallback
export const memoryStore = {
  attendance: []
};


