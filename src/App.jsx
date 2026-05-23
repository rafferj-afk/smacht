import React, { useState, useEffect, useRef, useContext } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Home, History, Dumbbell, TrendingUp, Plus, X, Check, Play, Square,
  ChevronLeft, Clock, Search, Trash2, Edit3, Timer, Flame, ArrowRight,
  Settings, Calculator, Download, Upload, Link2, Zap, Volume2, VolumeX, Bell, BellOff,
  Moon, Sun,
} from 'lucide-react';

// ============================================================
//  CONSTANTS
// ============================================================
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Theme tokens
const LIGHT = {
  pageBg: '#F5F5F3',
  cardBg: '#FFFFFF',
  border: '#E8E8E6',
  inputBg: '#F5F5F3',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textFaint: '#D1D5DB',
  accent: '#7C8471',
  accentHover: '#697060',
  accentTint: '#F2F3F1',
  superset: '#34C759',
  navBg: 'rgba(255,255,255,0.95)',
  stickyBg: 'rgba(245,245,243,0.95)',
};

const DARK = {
  pageBg: '#111211',
  cardBg: '#1C1D1B',
  border: '#2E2F2C',
  inputBg: '#161714',
  textPrimary: '#F0F0EE',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textFaint: '#374151',
  accent: '#7C8471',
  accentHover: '#8E9882',
  accentTint: '#1E201C',
  superset: '#34C759',
  navBg: 'rgba(28,29,27,0.95)',
  stickyBg: 'rgba(17,18,17,0.95)',
};

const ThemeContext = React.createContext(LIGHT);

// ============================================================
//  SEED EXERCISES
// ============================================================
const SEED_EXERCISES = [
  { id: 'ex_bsquat', name: 'Back Squat', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex_fsquat', name: 'Front Squat', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex_pendsq', name: 'Pendulum Squat', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_hacksq', name: 'Hack Squat', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_beltsq', name: 'Belt Squat', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_smithsq', name: 'Smith Machine Squat', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_smithlunge', name: 'Smith Machine Lunge', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_bulg', name: 'Bulgarian Split Squat', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex_rdl', name: 'Barbell RDL', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex_dead', name: 'Conventional Deadlift', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex_machhipth', name: 'Machine Hip Thrust', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_bbhipth', name: 'Barbell Hip Thrust', muscle: 'Legs', equipment: 'Barbell' },
  { id: 'ex_legp', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_lylegc', name: 'Lying Leg Curl', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_seatlegc', name: 'Seated Leg Curl', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_nordic', name: 'Nordic Ham Curl', muscle: 'Legs', equipment: 'Bodyweight' },
  { id: 'ex_sissy', name: 'Sissy Squat', muscle: 'Legs', equipment: 'Bodyweight' },
  { id: 'ex_lege', name: 'Leg Extension', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_machabd', name: 'Machine Hip Abduction', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_stcalf', name: 'Standing Calf Raise', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_legpcalf', name: 'Leg Press Calf Press', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_donkcalf', name: 'Donkey Calf Raise', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_45hyp', name: '45° Hyperextension', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_seatdeadl', name: 'Seated Cable Deadlift', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex_bench', name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell' },
  { id: 'ex_bbincbench', name: 'Barbell Incline Press', muscle: 'Chest', equipment: 'Barbell' },
  { id: 'ex_smithinc', name: 'Smith Machine Incline Press', muscle: 'Chest', equipment: 'Machine' },
  { id: 'ex_dbincbench', name: 'DB Incline Press', muscle: 'Chest', equipment: 'Dumbbell' },
  { id: 'ex_dbbench', name: 'Dumbbell Bench Press', muscle: 'Chest', equipment: 'Dumbbell' },
  { id: 'ex_machchest', name: 'Machine Chest Press', muscle: 'Chest', equipment: 'Machine' },
  { id: 'ex_pecdeck', name: 'Pec Deck', muscle: 'Chest', equipment: 'Machine' },
  { id: 'ex_dbfly', name: 'DB Fly', muscle: 'Chest', equipment: 'Dumbbell' },
  { id: 'ex_cabfly', name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable' },
  { id: 'ex_dip', name: 'Dip', muscle: 'Chest', equipment: 'Bodyweight' },
  { id: 'ex_ohp', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell' },
  { id: 'ex_dbohp', name: 'Seated Dumbbell Press', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex_latr', name: 'Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex_machlatr', name: 'Machine Lateral Raise', muscle: 'Shoulders', equipment: 'Machine' },
  { id: 'ex_cablatr', name: 'Cable Lateral Raise', muscle: 'Shoulders', equipment: 'Cable' },
  { id: 'ex_highcablatr', name: 'High Cable Lateral Raise', muscle: 'Shoulders', equipment: 'Cable' },
  { id: 'ex_incyraise', name: 'Incline DB Y-Raise', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex_rpec1', name: '1-Arm Reverse Pec Deck', muscle: 'Shoulders', equipment: 'Machine' },
  { id: 'ex_rdelt', name: 'Rear Delt Fly', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex_revcabxo', name: 'Reverse Cable Crossover', muscle: 'Shoulders', equipment: 'Cable' },
  { id: 'ex_pullup', name: 'Pull-Up (Wide Grip)', muscle: 'Back', equipment: 'Bodyweight' },
  { id: 'ex_chin', name: 'Chin-up', muscle: 'Back', equipment: 'Bodyweight' },
  { id: 'ex_closelatpd', name: 'Close-Grip Lat Pulldown', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex_latpd', name: 'Lat Pulldown', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex_1armcab', name: '1-Arm Cable Pulldown', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex_brow', name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex_dbrow', name: 'Dumbbell Row', muscle: 'Back', equipment: 'Dumbbell' },
  { id: 'ex_csupmach', name: 'Chest-Supported Machine Row', muscle: 'Back', equipment: 'Machine' },
  { id: 'ex_csuptbar', name: 'Chest-Supported T-Bar Row', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex_csupdb', name: 'Chest-Supported DB Row', muscle: 'Back', equipment: 'Dumbbell' },
  { id: 'ex_seatcabrow', name: 'Seated Cable Row', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex_kelsoshrug', name: 'Kelso Shrug', muscle: 'Back', equipment: 'Other' },
  { id: 'ex_machshrug', name: 'Machine Shrug', muscle: 'Back', equipment: 'Machine' },
  { id: 'ex_bbshrug', name: 'Barbell Shrug', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex_ezpreach', name: 'EZ-Bar Preacher Curl', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex_dbpreach', name: 'DB Preacher Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_machpreach', name: 'Machine Preacher Curl', muscle: 'Arms', equipment: 'Machine' },
  { id: 'ex_bcurl', name: 'Barbell Curl', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex_ezcurl', name: 'EZ-Bar Curl', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex_dbcurl', name: 'Dumbbell Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_altdbcurl', name: 'Alternating DB Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_hcurl', name: 'Hammer Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_bayesian', name: 'Bayesian Cable Curl', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex_inccurl', name: 'Incline DB Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_zottman', name: 'Modified Zottman Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_tpush', name: 'Triceps Pressdown', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex_closebench', name: 'Close-Grip Bench Press', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex_skull', name: 'Skull Crusher', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex_ohtriext', name: 'Overhead Cable Triceps Extension', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex_ohdbtri', name: 'Overhead DB Tricep Extension', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_cabkickback', name: 'Cable Triceps Kickback', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex_seatdip', name: 'Seated Dip Machine', muscle: 'Arms', equipment: 'Machine' },
  { id: 'ex_dbwrcurl', name: 'DB Wrist Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_dbwrext', name: 'DB Wrist Extension', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_dragflag', name: 'Dragon Flag', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex_lyingleg', name: 'Lying Leg Raise', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex_cabcrunch', name: 'Cable Crunch', muscle: 'Core', equipment: 'Cable' },
  { id: 'ex_machcrunch', name: 'Machine Crunch', muscle: 'Core', equipment: 'Machine' },
  { id: 'ex_plank', name: 'Plank', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex_hang', name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex_abwh', name: 'Ab Wheel Rollout', muscle: 'Core', equipment: 'Other' },
  { id: 'ex_deadhang', name: 'Dead Hang', muscle: 'Other', equipment: 'Bodyweight' },
];

const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Other'];
const EQUIPMENT_TYPES = ['Barbell', 'Dumbbell', 'Machine', 'Cable', 'Bodyweight', 'Other'];

// ============================================================
//  NIPPARD MIN-MAX ROUTINES (with default scheduled days)
// ============================================================
const NIPPARD_ROUTINES = [
  {
    id: 'nip_upper1', name: 'Upper 1', note: 'Nippard Min-Max · Block 1',
    scheduledDays: [0], // Mon
    exercises: [
      { exerciseId: 'ex_bbincbench', warmupRange: '2-4', workingSets: 2, repRange: '6-8', rirText: '2/1', restSeconds: 240, notes: 'Pause 1s at bottom. Maintain tension on pecs.' },
      { exerciseId: 'ex_pecdeck', warmupRange: '1-2', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Pause 1s at bottom, maintain pec tension.' },
      { exerciseId: 'ex_incyraise', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: '30° incline bench, back against bench.' },
      { exerciseId: 'ex_pullup', warmupRange: '1-2', workingSets: 2, repRange: '6-8', rirText: '2/1', restSeconds: 150, notes: 'Control the negative. Full ROM.' },
      { exerciseId: 'ex_kelsoshrug', warmupRange: '1-2', workingSets: 2, repRange: '6-8', rirText: '2/1', restSeconds: 150, notes: 'Pause 1s at top, squeeze shoulder blades.' },
      { exerciseId: 'ex_ezpreach', warmupRange: '0-1', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Keep triceps pinned against pad.' },
      { exerciseId: 'ex_tpush', warmupRange: '0-1', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Rope or bar attachment.' },
      { exerciseId: 'ex_dragflag', warmupRange: '0-1', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Keep body rigid throughout ROM.' },
    ],
  },
  {
    id: 'nip_lower1', name: 'Lower 1', note: 'Nippard Min-Max · Block 1',
    scheduledDays: [1], // Tue
    exercises: [
      { exerciseId: 'ex_lylegc', warmupRange: '1-2', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Biggest stretch at bottom. Prevent hips popping.' },
      { exerciseId: 'ex_bsquat', warmupRange: '2-4', workingSets: 2, repRange: '6-8', rirText: '2/2', restSeconds: 240, notes: 'Back, Front, Pendulum, Hack, Belt or Smith squat.' },
      { exerciseId: 'ex_smithlunge', warmupRange: '1-2', workingSets: 1, repRange: '6-8', rirText: '1', restSeconds: 210, notes: 'Minimize contribution from back leg.' },
      { exerciseId: 'ex_lege', warmupRange: '1-2', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Set seat back for full stretch.' },
      { exerciseId: 'ex_machabd', warmupRange: '0-1', workingSets: 1, repRange: '6-8', rirText: '0', restSeconds: 90, notes: 'Foam pads between knees to increase ROM.' },
      { exerciseId: 'ex_stcalf', warmupRange: '0-1', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: '1-2s pause at bottom. Ankle roll.' },
    ],
  },
  {
    id: 'nip_upper2', name: 'Upper 2', note: 'Nippard Min-Max · Block 1',
    scheduledDays: [3], // Thu
    exercises: [
      { exerciseId: 'ex_closelatpd', warmupRange: '2-3', workingSets: 2, repRange: '8-10', rirText: '2/1', restSeconds: 150, notes: 'Lean back 15°, drive elbows down.' },
      { exerciseId: 'ex_csuptbar', warmupRange: '2-3', workingSets: 2, repRange: '8-10', rirText: '2/1', restSeconds: 150, notes: 'Flare elbows ~45°, squeeze at top.' },
      { exerciseId: 'ex_machshrug', warmupRange: '1-2', workingSets: 1, repRange: '6-8', rirText: '1', restSeconds: 90, notes: 'Shrug up to your ears. Use straps.' },
      { exerciseId: 'ex_machchest', warmupRange: '2-4', workingSets: 2, repRange: '8-10', rirText: '2/1', restSeconds: 210, notes: '1s pause at bottom, pec tension.' },
      { exerciseId: 'ex_highcablatr', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: 'Cable at hip height. Hand past midline at bottom.' },
      { exerciseId: 'ex_rpec1', warmupRange: '0-1', workingSets: 1, repRange: '8-10', rirText: '0', restSeconds: 90, notes: 'Sweep out for largest semi-circle.' },
      { exerciseId: 'ex_cabcrunch', warmupRange: '0-1', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Round lower back as you crunch.' },
    ],
  },
  {
    id: 'nip_lower2', name: 'Lower 2', note: 'Nippard Min-Max · Block 1',
    scheduledDays: [4], // Fri
    exercises: [
      { exerciseId: 'ex_lege', warmupRange: '1-2', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: 'Full stretch (comfortable).' },
      { exerciseId: 'ex_rdl', warmupRange: '2-3', workingSets: 2, repRange: '6-8', rirText: '2/2', restSeconds: 120, notes: 'Glutes back, bar down over mid-foot.' },
      { exerciseId: 'ex_machhipth', warmupRange: '2-4', workingSets: 2, repRange: '6-8', rirText: '2/1', restSeconds: 210, notes: 'Squeeze glutes hard at top.' },
      { exerciseId: 'ex_legp', warmupRange: '2-4', workingSets: 1, repRange: '6-8', rirText: '1', restSeconds: 150, notes: 'Feet lower for quad focus. Deep.' },
      { exerciseId: 'ex_stcalf', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: '1-2s pause at bottom.' },
    ],
  },
  {
    id: 'nip_armsdelts', name: 'Arms / Delts', note: 'Nippard Min-Max · Block 1',
    scheduledDays: [5], // Sat
    exercises: [
      { exerciseId: 'ex_bayesian', warmupRange: '0-1', workingSets: 2, repRange: '6-8', rirText: '1/0', restSeconds: 90, notes: 'Lean forward. Deep stretch at bottom.' },
      { exerciseId: 'ex_ohtriext', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: 'Deep stretch through entire negative.' },
      { exerciseId: 'ex_zottman', warmupRange: '0-1', workingSets: 1, repRange: '8-10', rirText: '0', restSeconds: 90, notes: 'Hammer up, palms up on way down.' },
      { exerciseId: 'ex_cabkickback', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: 'Keep upper arm behind torso.' },
      { exerciseId: 'ex_dbwrcurl', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: 'Smooth, controlled reps.' },
      { exerciseId: 'ex_dbwrext', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: 'Smooth, controlled reps.' },
      { exerciseId: 'ex_altdbcurl', warmupRange: '0-1', workingSets: 2, repRange: '6-8', rirText: '0/0', restSeconds: 90, notes: 'Slow, controlled reps.' },
      { exerciseId: 'ex_machlatr', warmupRange: '0-1', workingSets: 2, repRange: '8-10', rirText: '1/0', restSeconds: 90, notes: 'Squeeze side delt to move weight.' },
      { exerciseId: 'ex_deadhang', warmupRange: '0-1', workingSets: 2, repRange: 'Time', rirText: '0/0', restSeconds: 90, notes: 'Add a few more seconds each week.' },
    ],
  },
];

// ============================================================
//  UTILS
// ============================================================
const storage = {
  async get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  async set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { console.error('Storage set failed', e); return false; }
  },
};

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
const fmtTime = (s) => {
  if (s == null || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60); const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};
const fmtDuration = (s) => {
  if (s == null) return '—';
  const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' });
const fmtDateShort = (iso) => { const d = new Date(iso); return `${d.getDate()}/${d.getMonth() + 1}`; };

// Monday = 0, Sunday = 6
const getTodayIdx = () => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; };

const e1rm = (weight, reps) => {
  if (!weight || !reps) return 0;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
};

// Working sets exclude warmups AND drop sets (drop sets are visual tracking only)
const isStatSet = (s) => s.completed && s.type !== 'warmup' && s.type !== 'drop';
const workingSetsOf = (ex) => ex.sets.filter(isStatSet);
const volumeOf = (workout, exercises = [], bodyweight = 0) =>
  workout.exercises.reduce((total, ex) => {
    const def = exercises.find(e => e.id === ex.exerciseId);
    const bw = def?.equipment === 'Bodyweight' ? bodyweight : 0;
    return total + workingSetsOf(ex).reduce((sum, s) => sum + ((s.weight || 0) + bw) * (s.reps || 0), 0);
  }, 0);

let audioCtx = null;
const playBeep = (enabled) => {
  if (!enabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    for (let i = 0; i < 3; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.frequency.value = 880; osc.type = 'sine';
      const start = audioCtx.currentTime + i * 0.25;
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
      osc.start(start); osc.stop(start + 0.15);
    }
  } catch (e) { console.error(e); }
};

// Returns: 'granted' | 'denied' | 'default' | 'unsupported'
const getNotificationStatus = () => {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return Notification.permission;
};

const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  try { return await Notification.requestPermission(); }
  catch { return 'denied'; }
};

const fireNotification = (title, body) => {
  try {
    if (!('Notification' in window) || Notification.permission !== 'granted') return false;
    new Notification(title, { body, tag: 'gym-daily' });
    return true;
  } catch { return false; }
};

const STD_PLATES_KG = [25, 20, 15, 10, 5, 2.5, 1.25];
const calculatePlates = (targetWeight, barWeight) => {
  const perSide = (targetWeight - barWeight) / 2;
  if (perSide <= 0) return { plates: [], perSide: 0, achievable: targetWeight };
  let remaining = perSide; const result = [];
  for (const p of STD_PLATES_KG) {
    const count = Math.floor(remaining / p);
    if (count > 0) { result.push({ plate: p, count }); remaining = Math.round((remaining - p * count) * 100) / 100; }
  }
  const loaded = result.reduce((s, r) => s + r.plate * r.count, 0);
  return { plates: result, perSide: loaded, achievable: barWeight + loaded * 2 };
};

const findLastSetsFor = (workouts, exerciseId) => {
  for (const w of workouts) {
    const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
    if (ex) return ex.sets.filter(s => s.type !== 'warmup');
  }
  return [];
};

const bestE1RMFor = (workouts, exerciseId) => {
  let best = 0;
  for (const w of workouts) {
    const ex = w.exercises.find((e) => e.exerciseId === exerciseId);
    if (!ex) continue;
    for (const s of ex.sets) {
      if (s.type === 'warmup' || s.type === 'drop') continue;
      const score = e1rm(s.weight, s.reps);
      if (score > best) best = score;
    }
  }
  return best;
};

const sessionCountFor = (workouts, exerciseId) =>
  workouts.filter((w) => w.exercises.some((e) => e.exerciseId === exerciseId)).length;

const bestPRFor = (workouts, exerciseId) => {
  let best = { weight: 0, reps: 0 };
  for (const w of workouts) {
    const ex = w.exercises.find(e => e.exerciseId === exerciseId);
    if (!ex) continue;
    for (const s of ex.sets) {
      if (s.type === 'warmup' || s.type === 'drop') continue;
      const wt = s.weight || 0;
      if (wt > best.weight || (wt === best.weight && (s.reps || 0) > best.reps)) {
        best = { weight: wt, reps: s.reps || 0 };
      }
    }
  }
  return best;
};

const groupByMonth = (workouts) => {
  const out = {};
  for (const w of workouts) {
    const key = new Date(w.startedAt).toLocaleDateString('en-IE', { month: 'long', year: 'numeric' });
    if (!out[key]) out[key] = [];
    out[key].push(w);
  }
  return out;
};

function computeWeeklyVolume(workouts, numWeeks, exercises = [], bodyweight = 0) {
  const weeks = [];
  const now = new Date();
  const mondayOfThisWeek = new Date(now);
  const day = mondayOfThisWeek.getDay() || 7;
  mondayOfThisWeek.setDate(mondayOfThisWeek.getDate() - day + 1);
  mondayOfThisWeek.setHours(0, 0, 0, 0);
  for (let i = numWeeks - 1; i >= 0; i--) {
    const start = new Date(mondayOfThisWeek);
    start.setDate(start.getDate() - i * 7);
    const end = new Date(start); end.setDate(end.getDate() + 7);
    const weekWorkouts = workouts.filter(w => { const d = new Date(w.startedAt); return d >= start && d < end; });
    const volume = weekWorkouts.reduce((s, w) => s + volumeOf(w, exercises, bodyweight), 0);
    weeks.push({ week: `${start.getDate()}/${start.getMonth() + 1}`, volume: Math.round(volume) });
  }
  return weeks;
}

// ============================================================
//  MAIN APP
// ============================================================
const DEFAULT_SETTINGS = {
  unit: 'kg',
  defaultRest: 90,
  barWeight: 20,
  bodyweight: 70,
  soundEnabled: true,
  notificationsEnabled: false,
  notificationTime: '08:00',
  darkMode: false,
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('home');
  const [exercises, setExercises] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    (async () => {
      const [ex, rt, wk, act, set] = await Promise.all([
        storage.get('gym:exercises', null),
        storage.get('gym:routines', []),
        storage.get('gym:workouts', []),
        storage.get('gym:active', null),
        storage.get('gym:settings', DEFAULT_SETTINGS),
      ]);
      const saved = ex || [];
      const merged = [...saved];
      for (const s of SEED_EXERCISES) if (!merged.some(x => x.id === s.id)) merged.push(s);
      setExercises(merged);
      if (!ex) storage.set('gym:exercises', merged);
      setRoutines(rt); setWorkouts(wk); setActiveWorkout(act);
      setSettings({ ...DEFAULT_SETTINGS, ...set });
      setLoading(false);
    })();
  }, []);

  useEffect(() => { if (!loading) storage.set('gym:exercises', exercises); }, [exercises, loading]);
  useEffect(() => { if (!loading) storage.set('gym:routines', routines); }, [routines, loading]);
  useEffect(() => { if (!loading) storage.set('gym:workouts', workouts); }, [workouts, loading]);
  useEffect(() => { if (!loading) storage.set('gym:active', activeWorkout); }, [activeWorkout, loading]);
  useEffect(() => { if (!loading) storage.set('gym:settings', settings); }, [settings, loading]);

  // Notification scheduler: checks once a minute whether to fire today's reminder
  useEffect(() => {
    if (loading) return;
    if (!settings.notificationsEnabled) return;

    const tick = async () => {
      const todayIdx = getTodayIdx();
      const todayKey = new Date().toISOString().slice(0, 10);
      const matched = routines.find(r => (r.scheduledDays || []).includes(todayIdx));
      if (!matched) return;

      const [hh, mm] = (settings.notificationTime || '08:00').split(':').map(Number);
      const now = new Date();
      const past = now.getHours() > hh || (now.getHours() === hh && now.getMinutes() >= mm);
      if (!past) return;

      const lastFired = await storage.get('gym:lastNotified', null);
      if (lastFired === todayKey) return;

      const ok = fireNotification('Smacht', `Today's session: ${matched.name}`);
      if (ok) await storage.set('gym:lastNotified', todayKey);
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [loading, routines, settings.notificationsEnabled, settings.notificationTime]);

  const startEmptyWorkout = () => {
    setActiveWorkout({ id: uid(), name: 'Workout', startedAt: new Date().toISOString(), exercises: [] });
  };

  const startFromRoutine = (routine) => {
    setActiveWorkout({
      id: uid(), name: routine.name, routineId: routine.id,
      startedAt: new Date().toISOString(),
      exercises: routine.exercises.map((re) => {
        const ex = exercises.find((e) => e.id === re.exerciseId);
        const lastSets = findLastSetsFor(workouts, re.exerciseId);
        const warmupCount = parseInt((re.warmupRange || '0').split('-')[0]) || 0;
        const workingCount = re.workingSets || 3;
        const sets = [];
        for (let i = 0; i < warmupCount; i++) sets.push({ type: 'warmup', weight: 0, reps: 0, completed: false });
        for (let i = 0; i < workingCount; i++) {
          sets.push({
            type: 'working',
            weight: lastSets[i]?.weight || 0,
            reps: lastSets[i]?.reps || 0,
            rir: null, completed: false,
          });
        }
        return {
          exerciseId: re.exerciseId, name: ex?.name || 'Exercise',
          sets, notes: re.notes || '',
          repRange: re.repRange, rirTarget: re.rirText,
          restSeconds: re.restSeconds || 90,
          supersetGroup: null,
        };
      }),
    });
  };

  const finishWorkout = () => {
    if (!activeWorkout) return;
    const finishedAt = new Date().toISOString();
    const duration = Math.floor((new Date(finishedAt) - new Date(activeWorkout.startedAt)) / 1000);
    const completed = {
      ...activeWorkout, finishedAt, duration,
      exercises: activeWorkout.exercises
        .map((ex) => ({ ...ex, sets: ex.sets.filter((s) => s.completed) }))
        .filter((ex) => ex.sets.length > 0),
    };
    if (completed.exercises.length === 0) { setActiveWorkout(null); return; }
    setWorkouts((prev) => [completed, ...prev]);
    setActiveWorkout(null);
    setTab('history');
  };

  const cancelWorkout = () => setActiveWorkout(null);

  const C = settings.darkMode ? DARK : LIGHT;

  if (loading) {
    return (
      <ThemeContext.Provider value={C}>
        <div className="min-h-screen flex items-center justify-center" style={{ background: C.pageBg, color: C.textSecondary }}>
          <div className="text-sm tracking-widest uppercase opacity-60">Loading…</div>
        </div>
      </ThemeContext.Provider>
    );
  }

  if (activeWorkout) {
    return (
      <ThemeContext.Provider value={C}>
        <ActiveWorkoutView
          workout={activeWorkout} setWorkout={setActiveWorkout}
          exercises={exercises} workouts={workouts}
          onFinish={finishWorkout} onCancel={cancelWorkout}
          settings={settings}
        />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={C}>
      <div className="min-h-screen pb-24" style={{ background: C.pageBg, color: C.textPrimary, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <FontLoader />
        <div className="max-w-2xl mx-auto">
          {tab === 'home' && <HomeTab workouts={workouts} routines={routines} exercises={exercises} settings={settings} setSettings={setSettings} onStartEmpty={startEmptyWorkout} onStartRoutine={startFromRoutine} onCreateRoutine={() => setTab('routines')} onOpenSettings={() => setShowSettings(true)} />}
          {tab === 'history' && <HistoryTab workouts={workouts} exercises={exercises} setWorkouts={setWorkouts} settings={settings} />}
          {tab === 'exercises' && <ExercisesTab exercises={exercises} setExercises={setExercises} />}
          {tab === 'progress' && <ProgressTab workouts={workouts} exercises={exercises} settings={settings} />}
          {tab === 'routines' && <RoutinesTab routines={routines} setRoutines={setRoutines} exercises={exercises} setExercises={setExercises} onStart={startFromRoutine} />}
        </div>
        <BottomNav tab={tab} setTab={setTab} />
        {showSettings && (
          <SettingsModal
            settings={settings} setSettings={setSettings}
            workouts={workouts} routines={routines} exercises={exercises}
            setWorkouts={setWorkouts} setRoutines={setRoutines} setExercises={setExercises}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
}

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&family=Bebas+Neue&display=swap');
      .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; }
      .num { font-variant-numeric: tabular-nums; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { scrollbar-width: none; }
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      input[type=number] { -moz-appearance: textfield; }
      .app-title {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 3.25rem;
        letter-spacing: 0.06em;
        line-height: 1;
        background: linear-gradient(135deg, #7C8471 0%, #4E5C47 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `}</style>
  );
}

function BottomNav({ tab, setTab }) {
  const C = useContext(ThemeContext);
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'history', label: 'History', icon: History },
    { id: 'routines', label: 'Routines', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'exercises', label: 'Library', icon: Search },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur z-40" style={{ background: C.navBg, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-2xl mx-auto grid grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          const active = tab === it.id;
          return (
            <button
              key={it.id} onClick={() => setTab(it.id)}
              className="flex flex-col items-center justify-center gap-1 py-3 transition"
              style={{ color: active ? C.accent : C.textMuted }}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] uppercase tracking-wider font-medium">{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function StatCard({ label, value, unit }) {
  const C = useContext(ThemeContext);
  return (
    <div className="rounded-2xl p-3" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>{label}</div>
      <div className="text-3xl font-bold leading-none" style={{ color: C.textPrimary }}>{value}</div>
      <div className="text-[10px] mt-1" style={{ color: C.textMuted }}>{unit}</div>
    </div>
  );
}

function Modal({ children, onClose, fullscreen }) {
  const C = useContext(ThemeContext);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose} />
      <div
        className={`relative w-full overflow-y-auto ${fullscreen ? 'h-full sm:max-w-2xl sm:h-[90vh] sm:rounded-2xl' : 'max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-3xl'}`}
        style={{ background: C.cardBg, border: `1px solid ${C.border}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ============================================================
//  HOME TAB (with Today's Plan banner)
// ============================================================
function HomeTab({ workouts, routines, exercises, settings, setSettings, onStartEmpty, onStartRoutine, onCreateRoutine, onOpenSettings }) {
  const C = useContext(ThemeContext);
  const totalVolume = workouts.reduce((s, w) => s + volumeOf(w, exercises, settings.bodyweight), 0);
  const lastWorkout = workouts[0];
  const thisWeek = workouts.filter((w) => (Date.now() - new Date(w.startedAt)) / (1000 * 60 * 60 * 24) < 7).length;

  const todayIdx = getTodayIdx();
  const todaysRoutines = routines.filter(r => (r.scheduledDays || []).includes(todayIdx));
  const notifStatus = getNotificationStatus();
  const showNotifFallback = settings.notificationsEnabled && (notifStatus === 'denied' || notifStatus === 'unsupported');

  return (
    <div className="px-5 pt-8">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: C.textMuted }}>
            {new Date().toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
          <h1 className="app-title">Smacht</h1>
        </div>
        <button onClick={onOpenSettings} className="p-2 mt-2" style={{ color: C.textMuted }}>
          <Settings size={20} />
        </button>
      </header>

      {/* Today's Plan banner */}
      {todaysRoutines.length > 0 && (
        <div className="rounded-2xl p-4 mb-6 text-white" style={{ background: C.accent }}>
          <div className="text-[10px] uppercase tracking-[0.25em] mb-1 opacity-80">Today · {DAYS[todayIdx]}</div>
          {todaysRoutines.map((r, i) => (
            <div key={r.id} className={`flex items-center justify-between ${i > 0 ? 'mt-3 pt-3 border-t border-white/20' : ''}`}>
              <div>
                <div className="text-2xl font-bold">{r.name}</div>
                {r.note && <div className="text-xs opacity-80 mt-0.5">{r.note}</div>}
              </div>
              <button
                onClick={() => onStartRoutine(r)}
                className="px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-1.5"
                style={{ background: 'white', color: C.accent }}
              >
                <Play size={12} fill="currentColor" /> Start
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Notification fallback banner */}
      {showNotifFallback && (
        <div className="rounded-xl p-3 mb-4 flex items-start gap-2 text-xs" style={{ background: '#FEF3C7', border: '1px solid #FCD34D', color: '#92400E' }}>
          <BellOff size={14} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            {notifStatus === 'denied'
              ? 'Notifications are blocked in your browser. Enable in site settings to get reminders, or use the in-app banner above.'
              : "Your browser doesn't support notifications. Today's session is shown above when you open the app."}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-6">
        <StatCard label="This Week" value={thisWeek} unit="sessions" />
        <StatCard label="Total" value={workouts.length} unit="workouts" />
        <StatCard label="Volume" value={Math.round(totalVolume / 1000)} unit="t lifted" />
      </div>

      <button
        onClick={onStartEmpty}
        className="w-full active:scale-[0.99] transition text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2"
        style={{ background: C.accent }}
        onMouseOver={(e) => e.currentTarget.style.background = C.accentHover}
        onMouseOut={(e) => e.currentTarget.style.background = C.accent}
      >
        <Play size={18} fill="currentColor" />
        <span className="text-base tracking-wide">Start Empty Workout</span>
      </button>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs uppercase tracking-[0.25em]" style={{ color: C.textSecondary }}>Your Routines</h2>
          <button onClick={onCreateRoutine} className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1" style={{ color: C.accent }}>
            Manage <ArrowRight size={12} />
          </button>
        </div>
        {routines.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ border: `1px dashed ${C.textFaint}` }}>
            <Dumbbell size={24} className="mx-auto mb-2" style={{ color: C.textFaint }} />
            <div className="text-sm mb-3" style={{ color: C.textSecondary }}>No routines yet</div>
            <button onClick={onCreateRoutine} className="text-xs uppercase tracking-wider font-semibold" style={{ color: C.accent }}>
              + Add or Import Routines
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {routines.map((r) => (
              <button
                key={r.id} onClick={() => onStartRoutine(r)}
                className="w-full rounded-2xl p-4 text-left flex items-center justify-between transition hover:shadow-sm"
                style={{ background: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div>
                  <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{r.name}</div>
                  <div className="text-xs mt-1 flex items-center gap-2 flex-wrap" style={{ color: C.textMuted }}>
                    {r.note && <span style={{ color: C.accent }}>{r.note}</span>}
                    <span>{r.exercises.length} exercise{r.exercises.length !== 1 ? 's' : ''}</span>
                    {(r.scheduledDays || []).length > 0 && (
                      <span>· {(r.scheduledDays || []).map(d => DAYS[d]).join(', ')}</span>
                    )}
                  </div>
                </div>
                <Play size={18} style={{ color: C.accent }} fill="currentColor" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lastWorkout && (
        <div className="mt-10">
          <h2 className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: C.textSecondary }}>Last Session</h2>
          <div className="rounded-2xl p-4" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
            <div className="flex items-baseline justify-between mb-3">
              <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{lastWorkout.name}</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>{fmtDate(lastWorkout.startedAt)}</div>
            </div>
            <div className="flex gap-4 text-xs" style={{ color: C.textSecondary }}>
              <span className="flex items-center gap-1"><Clock size={12} /> {fmtDuration(lastWorkout.duration)}</span>
              <span className="flex items-center gap-1"><Dumbbell size={12} /> {lastWorkout.exercises.length} exercises</span>
              <span className="flex items-center gap-1 num"><Flame size={12} /> {Math.round(volumeOf(lastWorkout, exercises, settings.bodyweight))} kg</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
//  ACTIVE WORKOUT
// ============================================================
function ActiveWorkoutView({ workout, setWorkout, exercises, workouts, onFinish, onCancel, settings }) {
  const C = useContext(ThemeContext);
  const [showPicker, setShowPicker] = useState(false);
  const [restEndAt, setRestEndAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [plateCalcFor, setPlateCalcFor] = useState(null);
  const [supersetPicker, setSupersetPicker] = useState(null);
  const beepedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.floor((now - new Date(workout.startedAt).getTime()) / 1000);
  const restRemaining = restEndAt ? Math.max(0, Math.ceil((restEndAt - now) / 1000)) : 0;

  useEffect(() => {
    if (restEndAt && now >= restEndAt && !beepedRef.current) {
      beepedRef.current = true;
      playBeep(settings.soundEnabled);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
      setTimeout(() => { setRestEndAt(null); beepedRef.current = false; }, 200);
    }
  }, [now, restEndAt, settings.soundEnabled]);

  const startRest = (seconds) => setRestEndAt(Date.now() + (seconds || settings.defaultRest) * 1000);

  const addExercise = (ex) => {
    const last = findLastSetsFor(workouts, ex.id);
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises,
        {
          exerciseId: ex.id, name: ex.name,
          sets: [
            { type: 'working', weight: last[0]?.weight || 0, reps: last[0]?.reps || 0, rir: null, completed: false },
            { type: 'working', weight: last[1]?.weight || last[0]?.weight || 0, reps: last[1]?.reps || last[0]?.reps || 0, rir: null, completed: false },
            { type: 'working', weight: last[2]?.weight || last[0]?.weight || 0, reps: last[2]?.reps || last[0]?.reps || 0, rir: null, completed: false },
          ],
          notes: '', restSeconds: settings.defaultRest, supersetGroup: null,
        },
      ],
    });
    setShowPicker(false);
  };

  const updateSet = (exIdx, setIdx, patch) => {
    const next = { ...workout };
    next.exercises = [...next.exercises];
    next.exercises[exIdx] = { ...next.exercises[exIdx] };
    next.exercises[exIdx].sets = [...next.exercises[exIdx].sets];
    next.exercises[exIdx].sets[setIdx] = { ...next.exercises[exIdx].sets[setIdx], ...patch };
    setWorkout(next);
  };

  const toggleSetComplete = (exIdx, setIdx) => {
    const set = workout.exercises[exIdx].sets[setIdx];
    const wasCompleted = set.completed;
    updateSet(exIdx, setIdx, { completed: !set.completed });
    if (!wasCompleted && set.weight > 0 && set.reps > 0 && set.type !== 'warmup') {
      startRest(workout.exercises[exIdx].restSeconds || settings.defaultRest);
    }
  };

  const changeSetType = (exIdx, setIdx, type) => updateSet(exIdx, setIdx, { type });

  // Single add-set: clones the last set (preserving type & values)
  const addSetTo = (exIdx) => {
    const ex = workout.exercises[exIdx];
    const lastSet = ex.sets[ex.sets.length - 1];
    const cloned = lastSet
      ? { type: lastSet.type === 'warmup' ? 'working' : lastSet.type, weight: lastSet.weight || 0, reps: lastSet.reps || 0, rir: null, completed: false }
      : { type: 'working', weight: 0, reps: 0, rir: null, completed: false };
    const next = { ...workout };
    next.exercises = [...next.exercises];
    next.exercises[exIdx] = { ...next.exercises[exIdx], sets: [...next.exercises[exIdx].sets, cloned] };
    setWorkout(next);
  };

  const removeSet = (exIdx, setIdx) => {
    const next = { ...workout };
    next.exercises = [...next.exercises];
    next.exercises[exIdx] = { ...next.exercises[exIdx], sets: next.exercises[exIdx].sets.filter((_, i) => i !== setIdx) };
    setWorkout(next);
  };

  const removeExercise = (exIdx) => setWorkout({ ...workout, exercises: workout.exercises.filter((_, i) => i !== exIdx) });

  const setSupersetGroup = (exIdx, otherIdx) => {
    const group = uid();
    const next = { ...workout };
    next.exercises = next.exercises.map((ex, i) => (i === exIdx || i === otherIdx) ? { ...ex, supersetGroup: group } : ex);
    setWorkout(next);
    setSupersetPicker(null);
  };

  const clearSupersetGroup = (exIdx) => {
    const group = workout.exercises[exIdx].supersetGroup;
    if (!group) return;
    const next = { ...workout };
    next.exercises = next.exercises.map((ex) => ex.supersetGroup === group ? { ...ex, supersetGroup: null } : ex);
    setWorkout(next);
  };

  const totalSets = workout.exercises.reduce((s, e) => s + e.sets.filter(isStatSet).length, 0);

  return (
    <div className="min-h-screen" style={{ background: C.pageBg, color: C.textPrimary, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <FontLoader />

      <div className="sticky top-0 backdrop-blur z-30" style={{ background: C.stickyBg, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => setShowCancelConfirm(true)} className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>Cancel</button>
            <div className="text-center">
              <div className="text-2xl font-bold leading-none mono" style={{ color: C.textPrimary }}>{fmtTime(elapsed)}</div>
              <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: C.textMuted }}>{totalSets} working sets</div>
            </div>
            <button onClick={onFinish} className="font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 text-white" style={{ background: C.accent }}>
              <Square size={12} fill="currentColor" /> Finish
            </button>
          </div>
        </div>

        {restRemaining > 0 && (
          <div className="px-4 py-2 max-w-2xl mx-auto text-white" style={{ background: C.accent }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-sm"><Timer size={16} /> REST</div>
              <div className="text-2xl mono font-bold leading-none">{fmtTime(restRemaining)}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setRestEndAt(Date.now() + (restRemaining + 15) * 1000)} className="text-xs font-bold">+15s</button>
                <button onClick={() => setRestEndAt(null)} className="text-xs uppercase tracking-wider font-bold">Skip</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-4 pb-32">
        {workout.exercises.length === 0 && (
          <div className="text-center py-16">
            <Dumbbell size={32} className="mx-auto mb-3" style={{ color: C.textFaint }} />
            <div className="text-sm" style={{ color: C.textMuted }}>Tap below to add an exercise</div>
          </div>
        )}

        <div className="space-y-4">
          {workout.exercises.map((ex, exIdx) => (
            <ExerciseBlock
              key={exIdx}
              exercise={ex} exIdx={exIdx}
              allExercises={workout.exercises}
              workouts={workouts}
              onToggleSet={(setIdx) => toggleSetComplete(exIdx, setIdx)}
              onUpdateSet={(setIdx, patch) => updateSet(exIdx, setIdx, patch)}
              onChangeSetType={(setIdx, type) => changeSetType(exIdx, setIdx, type)}
              onAddSet={() => addSetTo(exIdx)}
              onRemoveSet={(setIdx) => removeSet(exIdx, setIdx)}
              onRemove={() => removeExercise(exIdx)}
              onPlateCalc={(weight) => setPlateCalcFor({ exIdx, weight })}
              onSuperset={() => setSupersetPicker(exIdx)}
              onClearSuperset={() => clearSupersetGroup(exIdx)}
              onEditRest={(sec) => {
                const next = { ...workout };
                next.exercises = [...next.exercises];
                next.exercises[exIdx] = { ...next.exercises[exIdx], restSeconds: sec };
                setWorkout(next);
              }}
              unit={settings.unit}
            />
          ))}
        </div>

        <button
          onClick={() => setShowPicker(true)}
          className="w-full mt-4 py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold uppercase text-xs tracking-wider transition"
          style={{ border: `2px dashed ${C.border}`, color: C.textMuted }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
        >
          <Plus size={16} /> Add Exercise
        </button>
      </div>

      {showPicker && <ExercisePicker exercises={exercises} onPick={addExercise} onClose={() => setShowPicker(false)} excludeIds={workout.exercises.map((e) => e.exerciseId)} />}
      {plateCalcFor !== null && <PlateCalculator initialWeight={plateCalcFor.weight} barWeight={settings.barWeight} onClose={() => setPlateCalcFor(null)} />}
      {supersetPicker !== null && <SupersetPicker exercises={workout.exercises} currentIdx={supersetPicker} onPick={(otherIdx) => setSupersetGroup(supersetPicker, otherIdx)} onClose={() => setSupersetPicker(null)} />}
      {showCancelConfirm && (
        <Modal onClose={() => setShowCancelConfirm(false)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2" style={{ color: C.textPrimary }}>Cancel workout?</h3>
            <p className="text-sm mb-6" style={{ color: C.textSecondary }}>Nothing will be saved.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelConfirm(false)} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Keep going</button>
              <button onClick={() => { setShowCancelConfirm(false); onCancel(); }} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider text-white" style={{ background: '#DC2626' }}>Discard</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ExerciseBlock({
  exercise, exIdx, allExercises, workouts, onToggleSet, onUpdateSet, onChangeSetType,
  onAddSet, onRemoveSet, onRemove, onPlateCalc, onSuperset, onClearSuperset, onEditRest, unit
}) {
  const C = useContext(ThemeContext);
  const [showTypeMenu, setShowTypeMenu] = useState(null);
  const [showRestEdit, setShowRestEdit] = useState(false);

  const lastSets = findLastSetsFor(workouts, exercise.exerciseId);
  const isSuperset = !!exercise.supersetGroup;
  const supersetPartner = isSuperset
    ? allExercises.find((e, i) => i !== exIdx && e.supersetGroup === exercise.supersetGroup)
    : null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: C.cardBg,
        border: `1px solid ${C.border}`,
        borderLeftWidth: isSuperset ? '4px' : '1px',
        borderLeftColor: isSuperset ? C.superset : C.border,
      }}
    >
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-lg font-bold" style={{ color: C.textPrimary }}>{exercise.name}</h3>
            {exercise.repRange && (
              <span className="text-[10px] uppercase tracking-wider mono" style={{ color: C.textMuted }}>
                {exercise.repRange} reps · RIR {exercise.rirTarget || '—'}
              </span>
            )}
          </div>
          {isSuperset && supersetPartner && (
            <div className="text-[10px] uppercase tracking-wider mt-1 flex items-center gap-1" style={{ color: C.superset }}>
              <Link2 size={10} /> Superset with {supersetPartner.name}
            </div>
          )}
          {exercise.notes && <div className="text-xs mt-1 italic" style={{ color: C.textMuted }}>{exercise.notes}</div>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setShowRestEdit(true)} className="p-1 mono text-[10px] uppercase flex items-center gap-0.5" style={{ color: C.textMuted }}>
            <Timer size={12} />{fmtTime(exercise.restSeconds || 90)}
          </button>
          {isSuperset ? (
            <button onClick={onClearSuperset} className="p-1" style={{ color: C.superset }}><Link2 size={14} /></button>
          ) : (
            <button onClick={onSuperset} className="p-1" style={{ color: C.textMuted }}><Link2 size={14} /></button>
          )}
          <button onClick={onRemove} className="p-1" style={{ color: C.textMuted }}><Trash2 size={14} /></button>
        </div>
      </div>

      <div className="grid grid-cols-[1.75rem_1.25rem_1fr_1fr_2.25rem_2.25rem] gap-1.5 px-3 py-2 text-[10px] uppercase tracking-wider font-semibold" style={{ color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>
        <div>Set</div><div></div><div>{unit}</div><div>Reps</div>
        <div className="text-center">RIR</div><div></div>
      </div>

      {exercise.sets.map((set, i) => {
        const workingSoFar = exercise.sets.slice(0, i + 1).filter(s => s.type !== 'warmup' && s.type !== 'drop').length;
        const displayIdx = set.type === 'warmup' ? 'W'
          : set.type === 'failure' ? 'F'
          : set.type === 'drop' ? 'D'
          : workingSoFar;
        const previousMatch = (set.type !== 'warmup' && set.type !== 'drop') ? lastSets[workingSoFar - 1] : null;
        return (
          <SetRow
            key={i}
            index={displayIdx}
            set={set}
            previous={previousMatch}
            onToggle={() => onToggleSet(i)}
            onUpdate={(patch) => onUpdateSet(i, patch)}
            onChangeType={(type) => { onChangeSetType(i, type); setShowTypeMenu(null); }}
            onRemove={() => onRemoveSet(i)}
            onShowTypeMenu={() => setShowTypeMenu(showTypeMenu === i ? null : i)}
            typeMenuOpen={showTypeMenu === i}
            onPlateCalc={() => onPlateCalc(set.weight)}
          />
        );
      })}

      <button
        onClick={onAddSet}
        className="w-full px-4 py-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition"
        style={{ background: C.cardBg, color: C.accent, borderTop: `1px solid ${C.border}` }}
        onMouseOver={(e) => e.currentTarget.style.background = C.accentTint}
        onMouseOut={(e) => e.currentTarget.style.background = C.cardBg}
      >
        <Plus size={14} /> Add Set
      </button>

      {showRestEdit && (
        <Modal onClose={() => setShowRestEdit(false)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4" style={{ color: C.textPrimary }}>Rest Time</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[60, 90, 120, 150, 180, 240].map(s => (
                <button
                  key={s}
                  onClick={() => { onEditRest(s); setShowRestEdit(false); }}
                  className="py-3 rounded-xl font-semibold mono"
                  style={
                    exercise.restSeconds === s
                      ? { background: C.accent, color: 'white' }
                      : { background: C.inputBg, color: C.textPrimary }
                  }
                >
                  {fmtTime(s)}
                </button>
              ))}
            </div>
            <button onClick={() => setShowRestEdit(false)} className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SetRow({ index, set, previous, onToggle, onUpdate, onChangeType, onRemove, onShowTypeMenu, typeMenuOpen, onPlateCalc }) {
  const C = useContext(ThemeContext);
  // Subtle row tints when completed
  const rowBg = !set.completed ? 'transparent'
    : set.type === 'warmup' ? '#FEF9C3'
    : set.type === 'failure' ? '#FEE2E2'
    : set.type === 'drop' ? '#F3E8FF'
    : C.accentTint; // working

  const badgeColor =
    set.type === 'warmup' ? '#A16207'
    : set.type === 'failure' ? '#DC2626'
    : set.type === 'drop' ? '#9333EA'
    : set.completed ? C.accent : C.textSecondary;

  const checkBg = !set.completed ? '#E5E5E3'
    : set.type === 'warmup' ? '#EAB308'
    : set.type === 'failure' ? '#DC2626'
    : set.type === 'drop' ? '#9333EA'
    : C.accent;

  const checkColor = set.completed ? 'white' : C.textMuted;

  return (
    <div>
      <div className="relative grid grid-cols-[1.75rem_1.25rem_1fr_1fr_2.25rem_2.25rem] gap-1.5 px-3 py-2 items-center transition" style={{ background: rowBg }}>
        <button onClick={onShowTypeMenu} className="mono font-bold text-sm" style={{ color: badgeColor }}>{index}</button>
        <button onClick={onPlateCalc} title="Plate calculator" style={{ color: C.textMuted }}><Calculator size={12} /></button>
        <input
          type="number" inputMode="decimal"
          value={set.weight || ''}
          onChange={(e) => onUpdate({ weight: parseFloat(e.target.value) || 0 })}
          placeholder={previous ? String(previous.weight) : '0'}
          className="w-full mono rounded-lg py-1.5 px-1.5 text-center text-sm font-semibold outline-none"
          style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }}
          onFocus={(e) => e.currentTarget.style.borderColor = C.accent}
          onBlur={(e) => e.currentTarget.style.borderColor = C.border}
        />
        <input
          type="number" inputMode="numeric"
          value={set.reps || ''}
          onChange={(e) => onUpdate({ reps: parseInt(e.target.value) || 0 })}
          placeholder={previous ? String(previous.reps) : '0'}
          className="w-full mono rounded-lg py-1.5 px-1.5 text-center text-sm font-semibold outline-none"
          style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }}
          onFocus={(e) => e.currentTarget.style.borderColor = C.accent}
          onBlur={(e) => e.currentTarget.style.borderColor = C.border}
        />
        <input
          type="number" inputMode="numeric" min="0" max="10"
          value={set.rir ?? ''}
          onChange={(e) => onUpdate({ rir: e.target.value === '' ? null : parseInt(e.target.value) })}
          placeholder="—"
          className="w-full mono rounded-lg py-1.5 px-1 text-center text-[11px] outline-none disabled:opacity-30"
          style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textSecondary }}
          disabled={set.type === 'warmup'}
          onFocus={(e) => e.currentTarget.style.borderColor = C.accent}
          onBlur={(e) => e.currentTarget.style.borderColor = C.border}
        />
        <button
          onClick={onToggle}
          onContextMenu={(e) => { e.preventDefault(); onRemove(); }}
          className="flex items-center justify-center rounded-lg transition h-8"
          style={{ background: checkBg, color: checkColor }}
        >
          <Check size={14} strokeWidth={3} />
        </button>

        {typeMenuOpen && (
          <div className="absolute top-full left-0 z-20 rounded-xl shadow-lg p-1 mt-1 min-w-[140px]" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
            <SetTypeMenuButton label="Warm-up" active={set.type === 'warmup'} color="#A16207" bg="#FEF9C3" onClick={() => onChangeType('warmup')} />
            <SetTypeMenuButton label="Working Set" active={set.type === 'working' || (!set.type)} color={C.accent} bg={C.accentTint} onClick={() => onChangeType('working')} />
            <SetTypeMenuButton label="To Failure" active={set.type === 'failure'} color="#DC2626" bg="#FEE2E2" onClick={() => onChangeType('failure')} />
            <SetTypeMenuButton label="Drop Set" active={set.type === 'drop'} color="#9333EA" bg="#F3E8FF" onClick={() => onChangeType('drop')} />
            <div className="my-1" style={{ borderTop: `1px solid ${C.border}` }} />
            <button onClick={onRemove} className="w-full text-left px-3 py-2 text-xs rounded-lg" style={{ color: '#DC2626' }}>Delete Set</button>
          </div>
        )}
      </div>

      {/* Previous-session display: always visible when prev data exists */}
      {previous && (set.type === 'working' || set.type === 'failure' || !set.type) && (
        <div className="px-3 pb-1.5 -mt-1 text-[10px] mono pl-[3.25rem]" style={{ color: C.textMuted }}>
          Last: <span style={{ color: C.textSecondary }}>{previous.weight} × {previous.reps}{previous.rir != null ? ` @ RIR ${previous.rir}` : ''}</span>
        </div>
      )}
    </div>
  );
}

function SetTypeMenuButton({ label, active, color, bg, onClick }) {
  const C = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 text-xs rounded-lg"
      style={active ? { background: bg, color } : { color: C.textPrimary }}
    >
      {label}
    </button>
  );
}

function SupersetPicker({ exercises, currentIdx, onPick, onClose }) {
  const C = useContext(ThemeContext);
  const available = exercises.map((ex, i) => ({ ex, i })).filter(({ ex, i }) => i !== currentIdx && !ex.supersetGroup);
  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color: C.textPrimary }}>Create Superset</h3>
        <p className="text-sm mb-4" style={{ color: C.textSecondary }}>Pair <span style={{ color: C.textPrimary, fontWeight: 600 }}>{exercises[currentIdx].name}</span> with:</p>
        {available.length === 0 ? (
          <div className="text-sm py-4" style={{ color: C.textMuted }}>Add another exercise first, or remove an existing superset.</div>
        ) : (
          <div className="space-y-2 mb-4 max-h-[50vh] overflow-y-auto">
            {available.map(({ ex, i }) => (
              <button key={i} onClick={() => onPick(i)} className="w-full py-3 px-4 rounded-xl text-left transition" style={{ background: C.inputBg, color: C.textPrimary }}>
                {ex.name}
              </button>
            ))}
          </div>
        )}
        <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Cancel</button>
      </div>
    </Modal>
  );
}

function PlateCalculator({ initialWeight, barWeight, onClose }) {
  const C = useContext(ThemeContext);
  const [target, setTarget] = useState(initialWeight || barWeight);
  const [bar, setBar] = useState(barWeight);
  const result = calculatePlates(target, bar);
  const diff = target - result.achievable;

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator size={20} style={{ color: C.accent }} />
          <h3 className="text-2xl font-bold" style={{ color: C.textPrimary }}>Plate Calculator</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Target (kg)</label>
            <input
              type="number" inputMode="decimal" step="0.5"
              value={target} onChange={(e) => setTarget(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl py-3 px-3 text-xl mono font-bold outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Bar (kg)</label>
            <input
              type="number" inputMode="decimal" step="0.5"
              value={bar} onChange={(e) => setBar(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl py-3 px-3 text-xl mono font-bold outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }}
            />
          </div>
        </div>

        <div className="rounded-2xl p-4 mb-4" style={{ background: C.inputBg, border: `1px solid ${C.border}` }}>
          <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>Per side</div>
          {result.plates.length === 0 ? (
            <div className="text-sm" style={{ color: C.textMuted }}>{target <= bar ? 'Target ≤ bar weight' : 'No plates needed'}</div>
          ) : (
            <div className="space-y-2">
              {result.plates.map((p) => (
                <div key={p.plate} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold mono w-14" style={{ color: C.accent }}>{p.plate}</div>
                    <div className="text-xs" style={{ color: C.textMuted }}>kg</div>
                  </div>
                  <div className="text-xl font-bold mono" style={{ color: C.textPrimary }}>×{p.count}</div>
                </div>
              ))}
              <div className="pt-2 mt-2 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${C.border}` }}>
                <span className="uppercase tracking-wider" style={{ color: C.textMuted }}>Per side</span>
                <span className="mono font-bold" style={{ color: C.textPrimary }}>{result.perSide} kg</span>
              </div>
            </div>
          )}
        </div>

        {diff > 0.01 && (
          <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: '#FEF3C7', border: '1px solid #FCD34D', color: '#92400E' }}>
            Can't hit exact target. Closest: <span className="font-bold mono">{result.achievable} kg</span> ({diff.toFixed(2)} kg short).
          </div>
        )}

        <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Close</button>
      </div>
    </Modal>
  );
}

function ExercisePicker({ exercises, onPick, onClose, excludeIds = [] }) {
  const C = useContext(ThemeContext);
  const [q, setQ] = useState('');
  const [muscle, setMuscle] = useState('All');
  const filtered = exercises.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()) && (muscle === 'All' || e.muscle === muscle));

  return (
    <Modal onClose={onClose} fullscreen>
      <div className="flex items-center gap-3 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
        <button onClick={onClose} style={{ color: C.textSecondary }}><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold flex-1" style={{ color: C.textPrimary }}>Add Exercise</h2>
      </div>
      <div className="p-4 sticky top-0 z-10" style={{ background: C.cardBg }}>
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search exercises…"
            className="w-full rounded-xl py-3 pl-10 pr-3 outline-none"
            style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {['All', ...MUSCLE_GROUPS].map((m) => (
            <button key={m} onClick={() => setMuscle(m)}
              className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition"
              style={muscle === m ? { background: C.accent, color: 'white' } : { background: C.inputBg, color: C.textSecondary, border: `1px solid ${C.border}` }}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-8">
        {filtered.length === 0 && <div className="text-center text-sm py-12" style={{ color: C.textMuted }}>No exercises match.</div>}
        {filtered.map((ex) => {
          const already = excludeIds.includes(ex.id);
          return (
            <button key={ex.id} onClick={() => !already && onPick(ex)}
              className="w-full py-3 px-3 flex items-center justify-between text-left transition"
              style={{ borderBottom: `1px solid ${C.border}`, opacity: already ? 0.4 : 1 }}
              disabled={already}>
              <div>
                <div className="font-semibold" style={{ color: C.textPrimary }}>{ex.name}</div>
                <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{ex.muscle} · {ex.equipment}</div>
              </div>
              {already
                ? <span className="text-[10px] uppercase tracking-wider" style={{ color: C.textMuted }}>Added</span>
                : <Plus size={18} style={{ color: C.accent }} />}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

// ============================================================
//  HISTORY
// ============================================================
function HistoryTab({ workouts, exercises, setWorkouts, settings }) {
  const C = useContext(ThemeContext);
  const [selectedId, setSelectedId] = useState(null);
  const selected = workouts.find((w) => w.id === selectedId);

  if (selected) {
    return (
      <WorkoutDetail
        workout={selected} exercises={exercises}
        onBack={() => setSelectedId(null)}
        onDelete={() => { setWorkouts((prev) => prev.filter((w) => w.id !== selected.id)); setSelectedId(null); }}
      />
    );
  }

  const grouped = groupByMonth(workouts);

  return (
    <div className="px-5 pt-8">
      <h1 className="text-3xl font-extrabold mb-6" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>History</h1>
      {workouts.length === 0 && (
        <div className="text-center py-16">
          <History size={32} className="mx-auto mb-3" style={{ color: C.textFaint }} />
          <div className="text-sm" style={{ color: C.textMuted }}>No workouts logged yet</div>
        </div>
      )}
      {Object.entries(grouped).map(([month, list]) => (
        <div key={month} className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: C.textMuted }}>{month}</div>
          <div className="space-y-2">
            {list.map((w) => (
              <button key={w.id} onClick={() => setSelectedId(w.id)}
                className="w-full rounded-2xl p-4 text-left transition"
                style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{w.name}</div>
                  <div className="text-xs" style={{ color: C.textMuted }}>{fmtDate(w.startedAt)}</div>
                </div>
                <div className="flex gap-4 text-xs" style={{ color: C.textSecondary }}>
                  <span className="flex items-center gap-1"><Clock size={12} /> {fmtDuration(w.duration)}</span>
                  <span className="flex items-center gap-1"><Dumbbell size={12} /> {w.exercises.length}</span>
                  <span className="flex items-center gap-1 num"><Flame size={12} /> {Math.round(volumeOf(w, exercises, settings?.bodyweight ?? 0))} kg</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkoutDetail({ workout, exercises, onBack, onDelete }) {
  const C = useContext(ThemeContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="px-5 pt-8">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-1" style={{ color: C.textSecondary }}>
          <ChevronLeft size={20} /> <span className="text-sm">Back</span>
        </button>
        <button onClick={() => setConfirmDelete(true)} style={{ color: C.textMuted }}><Trash2 size={18} /></button>
      </div>
      <h1 className="text-3xl font-extrabold" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>{workout.name}</h1>
      <div className="text-sm mb-6" style={{ color: C.textMuted }}>{fmtDate(workout.startedAt)}</div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <StatCard label="Duration" value={fmtDuration(workout.duration)} unit="time" />
        <StatCard label="Volume" value={Math.round(volumeOf(workout, exercises))} unit="kg" />
        <StatCard label="Sets" value={workout.exercises.reduce((s, e) => s + e.sets.filter(x => x.type !== 'warmup').length, 0)} unit="working" />
      </div>

      <div className="space-y-3">
        {workout.exercises.map((ex, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
            <div className="text-base font-bold mb-2" style={{ color: C.textPrimary }}>{ex.name}</div>
            <div className="space-y-1">
              {ex.sets.map((s, j) => {
                const label = s.type === 'warmup' ? 'Warm-up' : s.type === 'failure' ? 'Failure' : s.type === 'drop' ? 'Drop' : `Set ${j + 1}`;
                const labelColor = s.type === 'warmup' ? '#A16207' : s.type === 'failure' ? '#DC2626' : s.type === 'drop' ? '#9333EA' : C.textMuted;
                return (
                  <div key={j} className="flex items-center justify-between text-sm">
                    <span className="mono" style={{ color: labelColor }}>{label}</span>
                    <span className="mono" style={{ color: C.textPrimary }}>{s.weight} kg × {s.reps}{s.rir != null ? ` @ RIR ${s.rir}` : ''}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(false)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2" style={{ color: C.textPrimary }}>Delete workout?</h3>
            <p className="text-sm mb-6" style={{ color: C.textSecondary }}>This can't be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(false)} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Cancel</button>
              <button onClick={onDelete} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider text-white" style={{ background: '#DC2626' }}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
//  LIBRARY
// ============================================================
function ExercisesTab({ exercises, setExercises }) {
  const C = useContext(ThemeContext);
  const [q, setQ] = useState('');
  const [muscle, setMuscle] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const filtered = exercises.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()) && (muscle === 'All' || e.muscle === muscle));

  return (
    <div className="px-5 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>Library</h1>
        <button onClick={() => setShowAdd(true)} className="px-3 py-2 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center gap-1 text-white" style={{ background: C.accent }}>
          <Plus size={14} /> New
        </button>
      </div>
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search exercises…"
          className="w-full rounded-xl py-3 pl-10 pr-3 outline-none"
          style={{ background: C.cardBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2 mb-2">
        {['All', ...MUSCLE_GROUPS].map((m) => (
          <button key={m} onClick={() => setMuscle(m)}
            className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition"
            style={muscle === m ? { background: C.accent, color: 'white' } : { background: C.cardBg, color: C.textSecondary, border: `1px solid ${C.border}` }}>
            {m}
          </button>
        ))}
      </div>
      <div>
        {filtered.map((ex) => (
          <div key={ex.id} className="py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.border}` }}>
            <div>
              <div className="font-semibold" style={{ color: C.textPrimary }}>{ex.name}</div>
              <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{ex.muscle} · {ex.equipment}</div>
            </div>
            <button onClick={() => { if (confirm(`Delete "${ex.name}"?`)) setExercises((prev) => prev.filter((e) => e.id !== ex.id)); }}
              className="p-2" style={{ color: C.textMuted }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
      {showAdd && <AddExerciseModal onClose={() => setShowAdd(false)} onAdd={(ex) => { setExercises((prev) => [...prev, ex]); setShowAdd(false); }} />}
    </div>
  );
}

function AddExerciseModal({ onClose, onAdd }) {
  const C = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState('Chest');
  const [equipment, setEquipment] = useState('Barbell');
  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4" style={{ color: C.textPrimary }}>New Exercise</h3>
        <div className="space-y-3 mb-6">
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Name</label>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Machine Chest Press"
              className="w-full rounded-xl py-3 px-3 outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Muscle Group</label>
            <select value={muscle} onChange={(e) => setMuscle(e.target.value)}
              className="w-full rounded-xl py-3 px-3 outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }}>
              {MUSCLE_GROUPS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Equipment</label>
            <select value={equipment} onChange={(e) => setEquipment(e.target.value)}
              className="w-full rounded-xl py-3 px-3 outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }}>
              {EQUIPMENT_TYPES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Cancel</button>
          <button disabled={!name.trim()} onClick={() => onAdd({ id: uid(), name: name.trim(), muscle, equipment })}
            className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider text-white disabled:opacity-40" style={{ background: C.accent }}>Save</button>
        </div>
      </div>
    </Modal>
  );
}

// ============================================================
//  PROGRESS
// ============================================================
function ProgressTab({ workouts, exercises, settings }) {
  const C = useContext(ThemeContext);
  const [selectedExId, setSelectedExId] = useState(null);
  const exercisesWithData = exercises.filter((ex) => workouts.some((w) => w.exercises.some((we) => we.exerciseId === ex.id)));

  if (selectedExId) {
    const ex = exercises.find((e) => e.id === selectedExId);
    return <ExerciseProgress exercise={ex} workouts={workouts} onBack={() => setSelectedExId(null)} unit={settings.unit} exercises={exercises} bodyweight={settings.bodyweight} />;
  }

  const weeklyVolume = computeWeeklyVolume(workouts, 12, exercises, settings.bodyweight);

  return (
    <div className="px-5 pt-8">
      <h1 className="text-3xl font-extrabold mb-6" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>Progress</h1>

      {workouts.length >= 2 && (
        <div className="rounded-2xl p-4 mb-6" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
          <div className="text-xs uppercase tracking-wider mb-3" style={{ color: C.textSecondary }}>Weekly Volume</div>
          <div style={{ width: '100%', height: 160 }}>
            <ResponsiveContainer>
              <BarChart data={weeklyVolume} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="week" stroke={C.textMuted} fontSize={10} />
                <YAxis stroke={C.textMuted} fontSize={10} />
                <Tooltip contentStyle={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.textSecondary }} />
                <Bar dataKey="volume" fill={C.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {exercisesWithData.length === 0 ? (
        <div className="text-center py-16">
          <TrendingUp size={32} className="mx-auto mb-3" style={{ color: C.textFaint }} />
          <div className="text-sm" style={{ color: C.textMuted }}>Log some workouts to see your progress</div>
        </div>
      ) : (
        <>
          {/* PR Table */}
          <div className="rounded-2xl mb-6 overflow-hidden" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
            <div className="px-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
              <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: C.textSecondary }}>Personal Records</div>
            </div>
            <div className="grid grid-cols-[1fr_5rem_4rem] px-4 py-2 text-[10px] uppercase tracking-wider font-semibold" style={{ color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>
              <div>Exercise</div>
              <div className="text-right">Best</div>
              <div className="text-right">Reps</div>
            </div>
            {MUSCLE_GROUPS.map((mg) => {
              const list = exercisesWithData.filter(e => e.muscle === mg);
              if (list.length === 0) return null;
              return (
                <div key={mg}>
                  <div className="px-4 py-1.5 text-[10px] uppercase tracking-wider" style={{ background: C.inputBg, color: C.textMuted }}>{mg}</div>
                  {list.map((ex) => {
                    const pr = bestPRFor(workouts, ex.id);
                    const isBW = ex.equipment === 'Bodyweight';
                    return (
                      <button key={ex.id} onClick={() => setSelectedExId(ex.id)}
                        className="w-full grid grid-cols-[1fr_5rem_4rem] px-4 py-2.5 text-left transition"
                        style={{ borderTop: `1px solid ${C.border}` }}
                        onMouseOver={e => e.currentTarget.style.background = C.inputBg}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <div className="text-sm truncate pr-2" style={{ color: C.textPrimary }}>{ex.name}</div>
                        <div className="mono text-sm font-semibold text-right" style={{ color: C.accent }}>
                          {pr.weight > 0 ? `${pr.weight} kg` : isBW ? 'BW' : '—'}
                        </div>
                        <div className="mono text-sm text-right" style={{ color: C.textSecondary }}>
                          {pr.reps > 0 ? `×${pr.reps}` : '—'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: C.textMuted }}>Tap an exercise</div>
          {MUSCLE_GROUPS.map((mg) => {
            const list = exercisesWithData.filter((e) => e.muscle === mg);
            if (list.length === 0) return null;
            return (
              <div key={mg} className="mb-6">
                <div className="text-sm font-semibold mb-2" style={{ color: C.textSecondary }}>{mg}</div>
                <div className="space-y-1">
                  {list.map((ex) => {
                    const bestE = bestE1RMFor(workouts, ex.id);
                    const sessions = sessionCountFor(workouts, ex.id);
                    return (
                      <button key={ex.id} onClick={() => setSelectedExId(ex.id)}
                        className="w-full rounded-xl p-3 text-left flex items-center justify-between transition"
                        style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                        <div>
                          <div className="font-semibold text-sm" style={{ color: C.textPrimary }}>{ex.name}</div>
                          <div className="text-[10px] mt-0.5 uppercase tracking-wider" style={{ color: C.textMuted }}>
                            {sessions} session{sessions !== 1 ? 's' : ''} · Est. 1RM <span className="mono" style={{ color: C.textSecondary }}>{bestE} kg</span>
                          </div>
                        </div>
                        <TrendingUp size={14} style={{ color: C.accent }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

function ExerciseProgress({ exercise, workouts, onBack, unit, exercises = [], bodyweight = 0 }) {
  const C = useContext(ThemeContext);
  const isBodyweight = exercise?.equipment === 'Bodyweight';
  const data = [];
  [...workouts].sort((a, b) => new Date(a.startedAt) - new Date(b.startedAt)).forEach((w) => {
    const exData = w.exercises.find((e) => e.exerciseId === exercise.id);
    if (!exData) return;
    const working = exData.sets.filter(s => s.type !== 'warmup' && s.type !== 'drop');
    if (working.length === 0) return;
    const bw = isBodyweight ? bodyweight : 0;
    const best = working.reduce((b, s) => { const score = e1rm((s.weight || 0) + bw, s.reps); return score > b.score ? { score, weight: s.weight, reps: s.reps } : b; }, { score: 0, weight: 0, reps: 0 });
    data.push({
      date: fmtDateShort(w.startedAt), fullDate: w.startedAt,
      topWeight: Math.max(...working.map((s) => (s.weight || 0) + bw)),
      e1rm: best.score,
      volume: Math.round(working.reduce((s, x) => s + ((x.weight || 0) + bw) * (x.reps || 0), 0)),
    });
  });

  const bestE = data.length ? Math.max(...data.map((d) => d.e1rm)) : 0;
  const bestWeight = data.length ? Math.max(...data.map((d) => d.topWeight)) : 0;

  return (
    <div className="px-5 pt-8">
      <button onClick={onBack} className="flex items-center gap-1 mb-4" style={{ color: C.textSecondary }}>
        <ChevronLeft size={20} /> <span className="text-sm">Back</span>
      </button>
      <h1 className="text-2xl font-extrabold leading-none" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>{exercise.name}</h1>
      <div className="text-xs uppercase tracking-wider mt-1" style={{ color: C.textMuted }}>{exercise.muscle} · {exercise.equipment}</div>

      <div className="grid grid-cols-2 gap-2 my-6">
        <StatCard label="Best Weight" value={`${bestWeight}`} unit={`${unit} top set`} />
        <StatCard label="Est. 1RM" value={`${bestE}`} unit={`${unit} (Epley)`} />
      </div>

      {data.length < 2 ? (
        <div className="rounded-2xl p-6 text-center" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
          <div className="text-sm" style={{ color: C.textSecondary }}>Log at least 2 sessions of this exercise to see a trend.</div>
        </div>
      ) : (
        <>
          <ChartCard title="Top Set Weight" data={data} dataKey="topWeight" color={C.accent} />
          <ChartCard title="Estimated 1RM" data={data} dataKey="e1rm" color={C.superset} />
          <ChartCard title="Session Volume" data={data} dataKey="volume" color="#7C3AED" type="bar" />
        </>
      )}

      <div className="mt-6">
        <div className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: C.textMuted }}>Log</div>
        <div className="space-y-2">
          {[...data].reverse().map((d, i) => (
            <div key={i} className="rounded-xl p-3 flex items-center justify-between" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
              <div className="text-sm" style={{ color: C.textSecondary }}>{fmtDate(d.fullDate)}</div>
              <div className="text-xs mono" style={{ color: C.textMuted }}>Top: <span style={{ color: C.textPrimary }}>{d.topWeight} kg</span> · 1RM: <span style={{ color: C.textPrimary }}>{d.e1rm} kg</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, data, dataKey, color, type = 'line' }) {
  const C = useContext(ThemeContext);
  return (
    <div className="rounded-2xl p-4 mb-4" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
      <div className="text-xs uppercase tracking-wider mb-3" style={{ color: C.textSecondary }}>{title}</div>
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="date" stroke={C.textMuted} fontSize={10} />
              <YAxis stroke={C.textMuted} fontSize={10} />
              <Tooltip contentStyle={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.textSecondary }} />
              <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="date" stroke={C.textMuted} fontSize={10} />
              <YAxis stroke={C.textMuted} fontSize={10} />
              <Tooltip contentStyle={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.textSecondary }} />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ fill: color, r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ============================================================
//  ROUTINES
// ============================================================
function RoutinesTab({ routines, setRoutines, exercises, setExercises, onStart }) {
  const C = useContext(ThemeContext);
  const [editing, setEditing] = useState(null);
  const [showImport, setShowImport] = useState(false);

  const importNippard = () => {
    const existing = new Set(routines.map(r => r.id));
    const newOnes = NIPPARD_ROUTINES.filter(r => !existing.has(r.id));
    setRoutines([...routines, ...newOnes]);
  };

  if (editing !== null) {
    return (
      <RoutineEditor
        routine={editing === 'new' ? { id: uid(), name: '', exercises: [], scheduledDays: [] } : routines.find((r) => r.id === editing)}
        exercises={exercises}
        onSave={(r) => { setRoutines((prev) => { const exists = prev.find((x) => x.id === r.id); return exists ? prev.map((x) => (x.id === r.id ? r : x)) : [...prev, r]; }); setEditing(null); }}
        onCancel={() => setEditing(null)}
        onDelete={() => { setRoutines((prev) => prev.filter((r) => r.id !== editing)); setEditing(null); }}
        isNew={editing === 'new'}
      />
    );
  }

  const hasNippard = routines.some(r => r.id.startsWith('nip_'));

  return (
    <div className="px-5 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>Routines</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImport(true)} className="px-3 py-2 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center gap-1"
            style={{ background: C.cardBg, border: `1px solid ${C.border}`, color: C.textSecondary }}>
            <Upload size={12} /> Import
          </button>
          <button onClick={() => setEditing('new')} className="px-3 py-2 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center gap-1 text-white" style={{ background: C.accent }}>
            <Plus size={14} /> New
          </button>
        </div>
      </div>

      {!hasNippard && (
        <div className="rounded-2xl p-4 mb-6" style={{ background: `linear-gradient(to bottom right, ${C.accentTint}, transparent)`, border: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} style={{ color: C.accent }} />
            <div className="text-base font-bold" style={{ color: C.textPrimary }}>Load Nippard Min-Max</div>
          </div>
          <div className="text-xs mb-3" style={{ color: C.textSecondary }}>5-day Upper/Lower/Arms split, scheduled Mon/Tue/Thu/Fri/Sat, with warm-ups, RIR targets, and coaching notes.</div>
          <button onClick={importNippard} className="px-4 py-2 rounded-xl font-semibold uppercase text-xs tracking-wider text-white" style={{ background: C.accent }}>
            Import 5 Routines
          </button>
        </div>
      )}

      {routines.length === 0 ? (
        <div className="text-center py-8">
          <Dumbbell size={32} className="mx-auto mb-3" style={{ color: C.textFaint }} />
          <div className="text-sm mb-4" style={{ color: C.textMuted }}>Build a routine, import one, or load the Nippard program above.</div>
          <button onClick={() => setEditing('new')} className="px-4 py-2 rounded-xl font-semibold uppercase text-xs tracking-wider text-white" style={{ background: C.accent }}>Create First Routine</button>
        </div>
      ) : (
        <div className="space-y-3">
          {routines.map((r) => (
            <div key={r.id} className="rounded-2xl p-4" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{r.name}</div>
                  {r.note && <div className="text-[10px] uppercase tracking-wider" style={{ color: C.accent }}>{r.note}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const json = JSON.stringify({ name: r.name, note: r.note, scheduledDays: r.scheduledDays, exercises: r.exercises }, null, 2);
                      navigator.clipboard.writeText(json).then(() => alert('Routine copied as JSON.'));
                    }}
                    style={{ color: C.textMuted }} title="Share"
                  ><Upload size={14} /></button>
                  <button onClick={() => setEditing(r.id)} style={{ color: C.textMuted }}><Edit3 size={14} /></button>
                </div>
              </div>
              <div className="text-xs mb-3 flex items-center gap-2 flex-wrap" style={{ color: C.textMuted }}>
                <span>{r.exercises.length} exercise{r.exercises.length !== 1 ? 's' : ''}</span>
                {(r.scheduledDays || []).length > 0 && (
                  <span>· {(r.scheduledDays || []).map(d => DAYS[d]).join(', ')}</span>
                )}
              </div>
              <div className="space-y-1 mb-3">
                {r.exercises.slice(0, 5).map((re, i) => {
                  const ex = exercises.find((e) => e.id === re.exerciseId);
                  return (
                    <div key={i} className="text-xs flex justify-between" style={{ color: C.textSecondary }}>
                      <span className="truncate">{ex?.name || 'Unknown'}</span>
                      <span className="mono whitespace-nowrap ml-2" style={{ color: C.textMuted }}>{re.workingSets || 3}×{re.repRange || '—'}</span>
                    </div>
                  );
                })}
                {r.exercises.length > 5 && <div className="text-xs italic" style={{ color: C.textFaint }}>+{r.exercises.length - 5} more…</div>}
              </div>
              <button onClick={() => onStart(r)} className="w-full py-2 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center justify-center gap-2 text-white" style={{ background: C.accent }}>
                <Play size={12} fill="currentColor" /> Start
              </button>
            </div>
          ))}
        </div>
      )}

      {showImport && (
        <ImportRoutineModal
          onClose={() => setShowImport(false)}
          onImport={(r) => { setRoutines([...routines, { ...r, id: uid() }]); setShowImport(false); }}
          exercises={exercises}
        />
      )}
    </div>
  );
}

function ImportRoutineModal({ onClose, onImport, exercises }) {
  const C = useContext(ThemeContext);
  const [json, setJson] = useState('');
  const [error, setError] = useState('');
  const handleImport = () => {
    try {
      const parsed = JSON.parse(json);
      if (!parsed.name || !Array.isArray(parsed.exercises)) { setError('Missing "name" or "exercises" array.'); return; }
      const unknown = parsed.exercises.filter(e => !exercises.find(x => x.id === e.exerciseId));
      if (unknown.length > 0) { if (!confirm(`${unknown.length} exercise(s) not in your library. Continue?`)) return; }
      onImport(parsed);
    } catch (e) { setError('Invalid JSON.'); }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color: C.textPrimary }}>Import Routine</h3>
        <p className="text-xs mb-4" style={{ color: C.textSecondary }}>Paste a routine JSON (from another Smacht user's Share button).</p>
        <textarea value={json} onChange={(e) => { setJson(e.target.value); setError(''); }}
          placeholder={`{\n  "name": "Push Day",\n  "scheduledDays": [0, 2, 4],\n  "exercises": [\n    { "exerciseId": "ex_bench", "workingSets": 3, "repRange": "6-8" }\n  ]\n}`}
          className="w-full rounded-xl py-3 px-3 mono text-xs outline-none h-40 resize-none"
          style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
        {error && <div className="text-xs mt-2" style={{ color: '#DC2626' }}>{error}</div>}
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Cancel</button>
          <button onClick={handleImport} disabled={!json.trim()} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider text-white disabled:opacity-40" style={{ background: C.accent }}>Import</button>
        </div>
      </div>
    </Modal>
  );
}

function RoutineEditor({ routine, exercises, onSave, onCancel, onDelete, isNew }) {
  const C = useContext(ThemeContext);
  const [name, setName] = useState(routine.name);
  const [note, setNote] = useState(routine.note || '');
  const [scheduledDays, setScheduledDays] = useState(routine.scheduledDays || []);
  const [items, setItems] = useState(routine.exercises);
  const [picker, setPicker] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);

  const toggleDay = (idx) => {
    const next = new Set(scheduledDays);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setScheduledDays([...next].sort());
  };

  const addExercise = (ex) => {
    setItems([...items, { exerciseId: ex.id, workingSets: 3, repRange: '8-10', rirText: '1/0', restSeconds: 90, warmupRange: '1-2', notes: '' }]);
    setPicker(false);
  };

  return (
    <div className="min-h-screen" style={{ background: C.pageBg }}>
      <FontLoader />
      <div className="px-5 pt-8 pb-32">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onCancel} className="flex items-center gap-1" style={{ color: C.textSecondary }}>
            <ChevronLeft size={20} /> <span className="text-sm">Cancel</span>
          </button>
          {!isNew && (
            <button onClick={() => { if (confirm(`Delete routine "${routine.name}"?`)) onDelete(); }} style={{ color: C.textMuted }}>
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Routine name"
          className="w-full bg-transparent text-3xl font-extrabold outline-none pb-2 mb-2"
          style={{ color: C.textPrimary, borderBottom: `1px solid ${C.border}`, letterSpacing: '-0.02em' }} />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note (optional)"
          className="w-full bg-transparent text-xs outline-none pb-2 mb-6"
          style={{ color: C.textSecondary, borderBottom: `1px solid ${C.border}` }} />

        {/* Schedule days */}
        <div className="mb-6">
          <label className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: C.textMuted }}>Scheduled Days</label>
          <div className="flex gap-1">
            {DAYS.map((day, idx) => {
              const selected = scheduledDays.includes(idx);
              return (
                <button
                  key={day} onClick={() => toggleDay(idx)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition"
                  style={selected
                    ? { background: C.accent, color: 'white' }
                    : { background: C.cardBg, color: C.textSecondary, border: `1px solid ${C.border}` }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {items.map((it, i) => {
            const ex = exercises.find((e) => e.id === it.exerciseId);
            return (
              <div key={i}>
                <div className="rounded-xl p-3" style={{ background: C.cardBg, border: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate" style={{ color: C.textPrimary }}>{ex?.name || 'Unknown'}</div>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: C.textMuted }}>{ex?.muscle}</div>
                    </div>
                    <button onClick={() => setEditingIdx(editingIdx === i ? null : i)} className="p-1" style={{ color: C.textMuted }}><Edit3 size={14} /></button>
                    <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="p-1" style={{ color: C.textMuted }}><X size={16} /></button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] uppercase tracking-wider" style={{ color: C.textMuted }}>
                    <div><div className="mono text-sm" style={{ color: C.textPrimary }}>{it.workingSets || 3}</div>sets</div>
                    <div><div className="mono text-sm" style={{ color: C.textPrimary }}>{it.repRange || '—'}</div>reps</div>
                    <div><div className="mono text-sm" style={{ color: C.textPrimary }}>{it.rirText || '—'}</div>RIR</div>
                    <div><div className="mono text-sm" style={{ color: C.textPrimary }}>{fmtTime(it.restSeconds || 90)}</div>rest</div>
                  </div>
                  {editingIdx === i && (
                    <div className="mt-3 pt-3 grid grid-cols-2 gap-2" style={{ borderTop: `1px solid ${C.border}` }}>
                      <LabelledInput label="Warm-up sets" value={it.warmupRange || '0-1'} onChange={(v) => { const n = [...items]; n[i] = { ...n[i], warmupRange: v }; setItems(n); }} />
                      <LabelledInput label="Working sets" value={String(it.workingSets || 3)} onChange={(v) => { const n = [...items]; n[i] = { ...n[i], workingSets: parseInt(v) || 1 }; setItems(n); }} numeric />
                      <LabelledInput label="Rep range" value={it.repRange || ''} onChange={(v) => { const n = [...items]; n[i] = { ...n[i], repRange: v }; setItems(n); }} />
                      <LabelledInput label="RIR" value={it.rirText || ''} onChange={(v) => { const n = [...items]; n[i] = { ...n[i], rirText: v }; setItems(n); }} />
                      <div className="col-span-2">
                        <LabelledInput label="Rest (seconds)" value={String(it.restSeconds || 90)} onChange={(v) => { const n = [...items]; n[i] = { ...n[i], restSeconds: parseInt(v) || 90 }; setItems(n); }} numeric />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Notes</label>
                        <input value={it.notes || ''} onChange={(e) => { const n = [...items]; n[i] = { ...n[i], notes: e.target.value }; setItems(n); }}
                          className="w-full rounded-lg py-2 px-2 text-sm outline-none"
                          style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={() => setPicker(true)}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold uppercase text-xs tracking-wider transition"
          style={{ border: `2px dashed ${C.border}`, color: C.textMuted }}>
          <Plus size={16} /> Add Exercise
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4" style={{ background: C.pageBg, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => { if (!name.trim() || items.length === 0) return; onSave({ ...routine, name: name.trim(), note: note.trim(), scheduledDays, exercises: items }); }}
            disabled={!name.trim() || items.length === 0}
            className="w-full py-4 rounded-2xl font-bold uppercase text-sm tracking-wider text-white disabled:opacity-40"
            style={{ background: C.accent }}
          >
            Save Routine
          </button>
        </div>
      </div>

      {picker && <ExercisePicker exercises={exercises} onPick={addExercise} onClose={() => setPicker(false)} excludeIds={items.map((i) => i.exerciseId)} />}
    </div>
  );
}

function LabelledInput({ label, value, onChange, numeric }) {
  const C = useContext(ThemeContext);
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        type={numeric ? 'number' : 'text'} inputMode={numeric ? 'numeric' : 'text'}
        className="w-full rounded-lg py-2 px-2 text-sm mono outline-none"
        style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
    </div>
  );
}

// ============================================================
//  SETTINGS
// ============================================================
function SettingsModal({ settings, setSettings, workouts, routines, exercises, setWorkouts, setRoutines, setExercises, onClose }) {
  const C = useContext(ThemeContext);
  const [notifStatus, setNotifStatus] = useState(getNotificationStatus());

  const toggleNotifications = async () => {
    if (settings.notificationsEnabled) {
      setSettings({ ...settings, notificationsEnabled: false });
      return;
    }
    const result = await requestNotificationPermission();
    setNotifStatus(result);
    setSettings({ ...settings, notificationsEnabled: result === 'granted' });
    if (result === 'denied') alert('Notifications denied. You can still see today\'s session in the in-app banner.');
    if (result === 'unsupported') alert('Your browser doesn\'t support notifications.');
  };

  const exportJSON = () => {
    const backup = { version: 1, exportedAt: new Date().toISOString(), exercises, routines, workouts, settings };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `smacht-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const rows = [['date', 'workout', 'exercise', 'set_number', 'set_type', 'weight_kg', 'reps', 'rir', 'volume_kg']];
    for (const w of workouts) for (const ex of w.exercises) ex.sets.forEach((s, i) => {
      rows.push([w.startedAt, w.name, ex.name, i + 1, s.type, s.weight, s.reps, s.rir ?? '', isStatSet(s) ? (s.weight * s.reps) : 0]);
    });
    const csv = rows.map(r => r.map(c => { const v = String(c ?? ''); return v.includes(',') || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v; }).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `smacht-workouts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const importBackup = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!confirm('This will REPLACE all your current data. Continue?')) return;
        if (data.exercises) setExercises(data.exercises);
        if (data.routines) setRoutines(data.routines);
        if (data.workouts) setWorkouts(data.workouts);
        if (data.settings) setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
        alert('Import complete!'); onClose();
      } catch { alert('Invalid backup file.'); }
    };
    reader.readAsText(file);
  };

  const wipeAll = () => {
    if (!confirm('This will delete ALL your workouts, routines, and custom exercises.')) return;
    if (!confirm('Really? This cannot be undone.')) return;
    setWorkouts([]); setRoutines([]); setExercises(SEED_EXERCISES);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4" style={{ color: C.textPrimary }}>Settings</h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Default rest (seconds)</label>
            <input type="number" value={settings.defaultRest}
              onChange={(e) => setSettings({ ...settings, defaultRest: parseInt(e.target.value) || 90 })}
              className="w-full rounded-xl py-3 px-3 mono outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Bar weight (kg)</label>
            <input type="number" step="0.5" value={settings.barWeight}
              onChange={(e) => setSettings({ ...settings, barWeight: parseFloat(e.target.value) || 20 })}
              className="w-full rounded-xl py-3 px-3 mono outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Bodyweight (kg)</label>
            <input type="number" step="0.5" value={settings.bodyweight ?? 70}
              onChange={(e) => setSettings({ ...settings, bodyweight: parseFloat(e.target.value) || 70 })}
              className="w-full rounded-xl py-3 px-3 mono outline-none"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
            <div className="text-[10px] mt-1" style={{ color: C.textMuted }}>Used to calculate volume for bodyweight exercises</div>
          </div>
          <button onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
            className="w-full rounded-xl py-3 px-4 flex items-center justify-between"
            style={{ background: C.inputBg }}>
            <span className="text-sm" style={{ color: C.textPrimary }}>Rest timer sound</span>
            {settings.soundEnabled ? <Volume2 size={16} style={{ color: C.accent }} /> : <VolumeX size={16} style={{ color: C.textMuted }} />}
          </button>
          <button onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
            className="w-full rounded-xl py-3 px-4 flex items-center justify-between"
            style={{ background: C.inputBg }}>
            <span className="text-sm" style={{ color: C.textPrimary }}>Dark mode</span>
            {settings.darkMode ? <Moon size={16} style={{ color: C.accent }} /> : <Sun size={16} style={{ color: C.textMuted }} />}
          </button>
        </div>

        {/* Notifications block */}
        <div className="pt-4 mb-6" style={{ borderTop: `1px solid ${C.border}` }}>
          <div className="text-[10px] uppercase tracking-wider mb-3" style={{ color: C.textMuted }}>Notifications</div>
          <button onClick={toggleNotifications}
            className="w-full rounded-xl py-3 px-4 flex items-center justify-between mb-2"
            style={{ background: C.inputBg }}>
            <div className="flex flex-col items-start">
              <span className="text-sm" style={{ color: C.textPrimary }}>Daily reminder</span>
              <span className="text-[10px]" style={{ color: C.textMuted }}>
                {notifStatus === 'unsupported' ? 'Not supported in this browser' :
                 notifStatus === 'denied' ? 'Blocked — enable in browser settings' :
                 settings.notificationsEnabled ? 'Enabled' : 'Off'}
              </span>
            </div>
            {settings.notificationsEnabled ? <Bell size={16} style={{ color: C.accent }} /> : <BellOff size={16} style={{ color: C.textMuted }} />}
          </button>
          {settings.notificationsEnabled && (
            <div>
              <label className="text-[10px] uppercase tracking-wider block mb-1" style={{ color: C.textMuted }}>Notification time</label>
              <input type="time" value={settings.notificationTime}
                onChange={(e) => setSettings({ ...settings, notificationTime: e.target.value })}
                className="w-full rounded-xl py-3 px-3 mono outline-none"
                style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary }} />
              <div className="text-[10px] mt-2" style={{ color: C.textMuted }}>
                Note: notifications only fire while the app is open. For background reminders, install as PWA.
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 mb-6" style={{ borderTop: `1px solid ${C.border}` }}>
          <div className="text-[10px] uppercase tracking-wider mb-3" style={{ color: C.textMuted }}>Data</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button onClick={exportJSON} className="py-3 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center justify-center gap-1" style={{ background: C.inputBg, color: C.textPrimary }}>
              <Download size={14} /> JSON
            </button>
            <button onClick={exportCSV} className="py-3 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center justify-center gap-1" style={{ background: C.inputBg, color: C.textPrimary }}>
              <Download size={14} /> CSV
            </button>
          </div>
          <label className="py-3 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center justify-center gap-1 cursor-pointer" style={{ background: C.inputBg, color: C.textPrimary }}>
            <Upload size={14} /> Restore from Backup
            <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importBackup(e.target.files[0])} />
          </label>
        </div>

        <div className="pt-4 mb-4" style={{ borderTop: `1px solid ${C.border}` }}>
          <button onClick={wipeAll} className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider"
            style={{ border: '1px solid #DC2626', color: '#DC2626' }}>
            Wipe All Data
          </button>
        </div>

        <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider text-white" style={{ background: C.accent }}>Done</button>
      </div>
    </Modal>
  );
}
