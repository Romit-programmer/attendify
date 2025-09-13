import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase, Attendance, memoryStore } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Static frontend (will place simple HTML in ../public)
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// Health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'attendify-backend' });
});

// Placeholder routes; real implementations will follow
app.get('/api/qr/token', (req, res) => {
  const token = Math.random().toString(36).slice(2);
  const expiresAt = Date.now() + 60 * 1000;
  res.json({ token, expiresAt });
});

let useMemory = false;

app.post('/api/attendance/mark', async (req, res) => {
  const { token, studentId } = req.body || {};
  if (!token || !studentId) return res.status(400).json({ error: 'token and studentId required' });
  try {
    if (useMemory) {
      const record = { token, studentId, timestamp: Date.now() };
      memoryStore.attendance.unshift(record);
      return res.json({ status: 'present', ...record });
    }
    const saved = await Attendance.create({ token, studentId });
    res.json({ status: 'present', token: saved.token, studentId: saved.studentId, timestamp: saved.timestamp });
  } catch (e) {
    res.status(500).json({ error: 'failed to mark attendance' });
  }
});

app.get('/api/attendance/present', async (req, res) => {
  try {
    if (useMemory) {
      return res.json(memoryStore.attendance);
    }
    const list = await Attendance.find().sort({ timestamp: -1 }).limit(100).lean();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: 'failed to fetch attendance' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

connectToDatabase().then((connected) => {
  useMemory = !connected;
  app.listen(PORT, () => {
    console.log(`Attendify backend running on http://localhost:${PORT} (store: ${useMemory ? 'memory' : 'mongo'})`);
  });
});


