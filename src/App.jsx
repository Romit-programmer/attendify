import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import QRCode from "qrcode.react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand to-indigo-600">
        <Link to="/">Attendify</Link>
      </h1>
      <nav className="space-x-4 text-sm">
        <Link className="text-slate-600 hover:text-brand" to="/">Home</Link>
        <span className="text-slate-400">Docs (soon)</span>
        <a className="text-slate-400 hover:text-brand" href="https://github.com/Romit-programmer" target="_blank" rel="noopener noreferrer">Help</a>
      </nav>
    </header>
  );
}

function useAuth() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const login = (r, id) => { localStorage.setItem('role', r); localStorage.setItem('userId', id); setRole(r); setUserId(id); };
  const logout = () => { localStorage.removeItem('role'); localStorage.removeItem('userId'); setRole(''); setUserId(''); };
  return { role, userId, login, logout };
}

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="text-center py-24">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
          Attendify
        </h2>
        <p className="text-slate-400 mt-3 max-w-xl mx-auto">
          Seamless attendance with soothing, focused UI.
        </p>
        <div className="mt-8">
          <button onClick={() => navigate('/role')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-lg hover:opacity-90 transition">
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-slate-100 mb-4">Why Choose Attendify?</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">Modern attendance management designed for the digital classroom</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">📱</span>
            </div>
            <h4 className="text-lg font-semibold text-slate-100 mb-2">QR Code Scanning</h4>
            <p className="text-slate-400 text-sm">Quick and secure attendance marking with instant QR code generation and scanning</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">📊</span>
            </div>
            <h4 className="text-lg font-semibold text-slate-100 mb-2">Real-time Tracking</h4>
            <p className="text-slate-400 text-sm">Live attendance monitoring with instant updates and comprehensive reporting</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">🎯</span>
            </div>
            <h4 className="text-lg font-semibold text-slate-100 mb-2">Personalized Planning</h4>
            <p className="text-slate-400 text-sm">Smart schedule suggestions based on your interests, strengths, and academic goals</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="text-3xl font-bold text-sky-400 mb-2">1000+</div>
            <div className="text-slate-400 text-sm">Students Served</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="text-3xl font-bold text-indigo-400 mb-2">50+</div>
            <div className="text-slate-400 text-sm">Active Classes</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="text-3xl font-bold text-emerald-400 mb-2">99.9%</div>
            <div className="text-slate-400 text-sm">Uptime</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-slate-400 text-sm">Support</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="bg-gradient-to-r from-sky-500/10 to-indigo-600/10 border border-sky-500/20 rounded-2xl p-8 backdrop-blur">
          <h3 className="text-2xl font-bold text-slate-100 mb-4">Ready to Transform Your Classroom?</h3>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Join thousands of educators and students who have already made the switch to digital attendance management</p>
          <button disabled
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500/50 to-indigo-600/50 text-white/70 font-semibold shadow-lg cursor-not-allowed opacity-60">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-slate-100 mb-4">Attendify</h4>
            <p className="text-slate-400 text-sm">Modern attendance management for the digital classroom</p>
          </div>
          <div>
            <h5 className="text-slate-100 font-medium mb-3">Product</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-slate-300 transition">Features</a></li>
              <li><a href="#" className="hover:text-slate-300 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-slate-300 transition">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-slate-100 font-medium mb-3">Support</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-slate-300 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-slate-300 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-slate-300 transition">Status</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-slate-100 font-medium mb-3">Connect</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://github.com/Romit-programmer" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition">GitHub</a></li>
              <li><a href="#" className="hover:text-slate-300 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-slate-300 transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-slate-400">
          <p>&copy; 2024 Attendify. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const role = params.get('role') || 'student';
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-6 mt-8">
      <h3 className="text-xl font-semibold text-slate-800">Login as {role}</h3>
      <p className="text-slate-600 text-sm mt-1">Enter your credentials to continue</p>
      <div className="mt-4 space-y-3">
        <input 
          value={userId} 
          onChange={e=>setUserId(e.target.value)} 
          className="w-full border border-slate-200 rounded-lg px-3 py-2" 
          placeholder={role==='student'?'Student ID':'Teacher ID'} 
        />
        <input 
          type="password"
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          className="w-full border border-slate-200 rounded-lg px-3 py-2" 
          placeholder="Password" 
        />
      </div>
      <button onClick={()=>{ login(role, userId || (role==='student'?'STU-DEMO':'TCH-DEMO')); navigate(role==='student'?'/student':'/teacher'); }} className="mt-4 w-full px-4 py-2 bg-brand text-white rounded-lg">Continue</button>
      <p className="text-center text-sm text-slate-500 mt-3">
        <a href="#" className="hover:text-slate-700 transition">Forgot Password?</a>
      </p>
    </div>
  );
}

function Student() {
  const { userId } = useAuth();
  const [scanLog, setScanLog] = useState('');
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);
  const [interests, setInterests] = useState(localStorage.getItem('interests') || 'AI, DSA, Systems');
  const [strengths, setStrengths] = useState(localStorage.getItem('strengths') || 'Algorithms, Databases');
  const [goals, setGoals] = useState(localStorage.getItem('goals') || 'Crack DSA patterns; Build OS project; Publish mini research');
  const [livePreview, setLivePreview] = useState(true);
  const baseRows = [
    { day: 'Monday', slots: ['DSA','DBMS','OS','Recess','SE','CN','Free'] },
    { day: 'Tuesday', slots: ['DBMS Lab','DBMS Lab','Maths','Recess','CN','OS','Free'] },
    { day: 'Wednesday', slots: ['OS','Maths','SE','Recess','Elective-AI','CN','Free'] },
    { day: 'Thursday', slots: ['CN Lab','CN Lab','DSA','Recess','Maths','OS','Free'] },
    { day: 'Friday', slots: ['SE','Elective-Cloud','Seminar','Recess','Project','Project','Free'] },
  ];
  const [rows, setRows] = useState(baseRows);
  async function startScan() {
    if (scanning) return;
    setScanning(true);
    if (!scannerRef.current) scannerRef.current = new Html5Qrcode('reader');
    const cams = await Html5Qrcode.getCameras();
    const camId = cams?.[0]?.id;
    await scannerRef.current.start(camId, { fps: 10, qrbox: 250 }, async (text)=>{
      await scannerRef.current?.pause(true);
      const { data } = await axios.post('/api/attendance/mark', { token: text, studentId: userId || 'STU-DEMO' });
      setScanLog(JSON.stringify(data, null, 2));
      await scannerRef.current?.resume();
    });
  }
  function buildSuggestedRows() {
    const interestTags = interests.toLowerCase();
    const goalTags = goals.toLowerCase();
    const pick = () => {
      if (goalTags.includes('dsa') || interestTags.includes('dsa')) return 'Goal: DSA practice';
      if (goalTags.includes('project') || interestTags.includes('project')) return 'Goal: Project work';
      if (goalTags.includes('ai') || interestTags.includes('ai')) return 'Goal: AI reading';
      if (goalTags.includes('os') || interestTags.includes('systems') || interestTags.includes('os')) return 'Goal: OS notes';
      if (goalTags.includes('db') || interestTags.includes('db')) return 'Goal: DBMS revise';
      return 'Goal: Revise lecture';
    };
    return baseRows.map(r => ({
      day: r.day,
      slots: r.slots.map(s => s === 'Free' ? pick() : s)
    }));
  }

  function generateSuggestions() {
    const newRows = buildSuggestedRows();
    setRows(newRows);
    localStorage.setItem('interests', interests);
    localStorage.setItem('strengths', strengths);
    localStorage.setItem('goals', goals);
    setShowPlanner(false);
  }

  function resetRoutine() {
    // restore all Free slots and clear saved preferences
    const fresh = baseRows.map(r => ({ day: r.day, slots: [...r.slots] }));
    setRows(fresh);
    localStorage.removeItem('interests');
    localStorage.removeItem('strengths');
    localStorage.removeItem('goals');
    setInterests('');
    setStrengths('');
    setGoals('');
    setLivePreview(false);
    setShowPlanner(false);
  }

  // Live preview when editing planner
  useEffect(() => {
    if (showPlanner && livePreview) {
      setRows(buildSuggestedRows());
    }
  }, [interests, strengths, goals, showPlanner, livePreview]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-slate-800">Scan QR</h3>
        <div id="reader" className="mt-4 w-full max-w-md aspect-square mx-auto border border-slate-200 rounded-lg"></div>
        <div className="mt-4 flex gap-3">
          <button onClick={startScan} className="px-4 py-2 bg-brand text-white rounded-lg">Start Scanner</button>
          <button onClick={()=>setShowPlanner(true)} className="px-4 py-2 bg-slate-800 text-white rounded-lg">Personalized Plan</button>
          <button onClick={resetRoutine} aria-label="Reset routine to Free slots" className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100">Reset to Free</button>
        </div>
        <pre className="mt-3 text-xs bg-slate-50 p-3 rounded border border-slate-200 overflow-auto">{scanLog}</pre>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold text-slate-800">Weekly Routine</h3>
        <p className="text-slate-500 text-sm">Placeholder timetable (CS Engineering). Will be updatable.</p>
        <div className="mt-4 min-w-[640px]">
          <div className="grid" style={{gridTemplateColumns: '140px repeat(7, 1fr)'}}>
            <div className="p-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-l-lg border border-slate-200">Day / Time</div>
            {['9:00','10:00','11:00','12:00','13:00','14:00','15:00'].map((t,i)=> (
              <div key={i} className="p-3 bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200 text-center">{t}</div>
            ))}
            {rows.map((row, rIdx)=> (
              <>
                <div key={row.day} className="p-3 bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200">{row.day}</div>
                {row.slots.map((s, cIdx)=> (
                  <div key={`${rIdx}-${cIdx}`} className={`p-3 text-sm border border-slate-200 text-center ${s==='Recess' ? 'bg-orange-50 text-orange-700 font-medium' : s.startsWith('Goal:') ? 'bg-emerald-50 text-emerald-700 font-medium' : 'bg-white text-slate-700'}`}>{s}</div>
                ))}
              </>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-orange-50 text-orange-700 border border-orange-200">Recess</span>
            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Personalized Goal</span>
            <span className="px-2 py-1 rounded bg-sky-50 text-sky-700 border border-sky-200">Lab</span>
            <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">Lecture</span>
          </div>
        </div>
      </div>

      {showPlanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800">Personalized Planner</h3>
            <div className="mt-4 grid gap-4">
              <div>
                <label className="block text-sm text-slate-600">Interests</label>
                <input value={interests} onChange={e=>setInterests(e.target.value)} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2" placeholder="e.g., AI, DSA, Systems" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Strengths</label>
                <input value={strengths} onChange={e=>setStrengths(e.target.value)} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2" placeholder="e.g., Algorithms, Databases" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Goals</label>
                <textarea value={goals} onChange={e=>setGoals(e.target.value)} rows={3} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2" placeholder="e.g., Crack DSA patterns; Build OS project; ..."></textarea>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" checked={livePreview} onChange={e=>setLivePreview(e.target.checked)} /> Live preview on timetable
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={()=>setShowPlanner(false)} className="px-4 py-2 rounded-lg border border-slate-200">Cancel</button>
              <button onClick={generateSuggestions} className="px-4 py-2 rounded-lg bg-brand text-white">Save & Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Teacher() {
  const [token, setToken] = useState('');
  const [present, setPresent] = useState([]);
  const [sessionEnd, setSessionEnd] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [config, setConfig] = useState({ subject: '', department: '', year: '' });
  const [configured, setConfigured] = useState(false);
  const [expired, setExpired] = useState(false);

  async function refreshToken() {
    if (expired) return;
    const { data } = await axios.get('/api/qr/token');
    setToken(data.token);
  }
  async function loadPresent() {
    const { data } = await axios.get('/api/attendance/present');
    setPresent(data);
  }

  function startSession() {
    // 1 hour validity window
    const end = Date.now() + 60 * 60 * 1000;
    setSessionEnd(end);
    setConfigured(true);
  }

  useEffect(()=>{
    if (!configured) return;
    refreshToken();
    const t = setInterval(refreshToken, 30000);
    loadPresent();
    const p = setInterval(loadPresent, 5000);
    const c = setInterval(()=>{
      if (!sessionEnd) return;
      const ms = sessionEnd - Date.now();
      if (ms <= 0) {
        setExpired(true);
        setTimeLeft('00:00:00');
      } else {
        const h = Math.floor(ms/3600000).toString().padStart(2,'0');
        const m = Math.floor((ms%3600000)/60000).toString().padStart(2,'0');
        const s = Math.floor((ms%60000)/1000).toString().padStart(2,'0');
        setTimeLeft(`${h}:${m}:${s}`);
      }
    }, 1000);
    return ()=>{ clearInterval(t); clearInterval(p); clearInterval(c); };
  },[configured, sessionEnd, expired]);

  if (!configured) {
    return (
      <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-slate-800">Start Class Session</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-slate-600">Subject</label>
            <select value={config.subject} onChange={e=>setConfig({...config, subject:e.target.value})} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2">
              <option value="">Select</option>
              <option>DSA</option>
              <option>DBMS</option>
              <option>OS</option>
              <option>CN</option>
              <option>SE</option>
              <option>Maths</option>
              <option>AI</option>
              <option>Cloud</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Department</label>
            <select value={config.department} onChange={e=>setConfig({...config, department:e.target.value})} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2">
              <option value="">Select</option>
              <option>CSE</option>
              <option>IT</option>
              <option>ECE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Year</label>
            <select value={config.year} onChange={e=>setConfig({...config, year:e.target.value})} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2">
              <option value="">Select</option>
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
            </select>
          </div>
        </div>
        <button disabled={!config.subject||!config.department||!config.year} onClick={startSession} className="mt-4 px-4 py-2 rounded-lg text-white disabled:opacity-50 bg-brand">Start Session</button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-center relative">
        <div className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">{config.subject} · {config.department} · {config.year}</div>
        <h3 className="text-xl font-semibold text-slate-800 text-left">Class QR</h3>
        <div className="w-full max-w-xs aspect-square mx-auto border border-slate-200 rounded-lg flex items-center justify-center mt-4">
          <QRCode value={token || 'waiting'} size={240} />
        </div>
        <p className="text-center text-sm text-slate-600 mt-2">Session time left: {timeLeft || '01:00:00'}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <button onClick={refreshToken} disabled={expired} className="px-4 py-2 bg-brand text-white rounded-lg disabled:opacity-50">Refresh QR</button>
          <button
            onClick={()=>window.open('/teacher/display','_blank')}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
            title="Open a projector-friendly live attendance view in a new tab"
            aria-label="Open Classroom Display"
          >
            📺 Open Classroom Display
          </button>
        </div>
        {expired && <p className="mt-2 text-xs text-red-600">Session expired. Start a new session to generate fresh QR codes.</p>}
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-slate-800">Present Students</h3>
        <ul className="mt-2 text-sm text-slate-700 space-y-1 border border-slate-200 rounded p-3 max-h-64 overflow-auto">
          {present.map((r,i)=>(<li key={i}>{r.studentId} ✓ {r.timestamp?new Date(r.timestamp).toLocaleTimeString():''}</li>))}
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  const [token, setToken] = useState("");
  const [expires, setExpires] = useState("");
  const [present, setPresent] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [scanLog, setScanLog] = useState("");
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  async function refreshToken() {
    const { data } = await axios.get("/api/qr/token");
    setToken(data.token);
    setExpires(new Date(data.expiresAt).toLocaleTimeString());
  }

  async function loadPresent() {
    const { data } = await axios.get("/api/attendance/present");
    setPresent(data);
  }

  async function startScan() {
    if (scanning) return;
    setScanning(true);
    const id = "reader";
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(id);
    }
    const cams = await Html5Qrcode.getCameras();
    const camId = cams?.[0]?.id;
    await scannerRef.current.start(
      camId,
      { fps: 10, qrbox: 250 },
      async (text) => {
        await scannerRef.current?.pause(true);
        const sid = studentId || "STU-DEMO";
        const { data } = await axios.post("/api/attendance/mark", { token: text, studentId: sid });
        setScanLog(JSON.stringify(data, null, 2));
        await scannerRef.current?.resume();
        loadPresent();
      }
    );
  }

  useEffect(() => {
    refreshToken();
    const t = setInterval(refreshToken, 30000);
    loadPresent();
    const p = setInterval(loadPresent, 5000);
    return () => { clearInterval(t); clearInterval(p); };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      <div className="gradient-blob blob-3"></div>
      <div className="max-w-6xl mx-auto p-6">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/role" element={<RolePicker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/teacher/display" element={<TeacherDisplay />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

function RolePicker() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mt-8 backdrop-blur">
      <h3 className="text-xl font-semibold text-slate-100">Select your role</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button onClick={()=>navigate('/login?role=student')} className="px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 transition">Student</button>
        <button onClick={()=>navigate('/login?role=teacher')} className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition">Teacher</button>
      </div>
    </div>
  );
}

function TeacherDisplay() {
  const [present, setPresent] = useState([]);
  useEffect(()=>{
    const load = async () => {
      try { const { data } = await axios.get('/api/attendance/present'); setPresent(data); } catch {}
    };
    load();
    const t = setInterval(load, 3000);
    return ()=>clearInterval(t);
  },[]);
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold">Real-time Attendance</h2>
      <p className="text-slate-400">Auto-updating list for classroom display</p>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {present.map((r,i)=> (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-xl font-semibold">{r.studentId}</div>
            <div className="text-sm text-slate-300">{r.timestamp? new Date(r.timestamp).toLocaleTimeString(): ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


