import React, { useState, useEffect, useRef, useContext } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Home, History, Dumbbell, TrendingUp, Plus, X, Check, Play, Square,
  ChevronLeft, Clock, Search, Trash2, Edit3, Timer, Flame, ArrowRight,
  Settings, Calculator, Download, Upload, Link2, Zap, Volume2, VolumeX, Bell, BellOff,
  Moon, Sun, Copy, CheckCheck, Share2, ChevronUp, ChevronDown, RefreshCw,
} from 'lucide-react';

// ============================================================
//  CONSTANTS
// ============================================================
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Theme tokens
const LIGHT = {
  pageBg: '#F5F5F3',
  cardBg: '#FFFFFF',
  cardSolid: '#FFFFFF',
  border: '#E8E8E6',
  inputBg: '#F5F5F3',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textFaint: '#D1D5DB',
  accent: '#7C8471',
  accentHover: '#697060',
  accentTint: '#F2F3F1',
  accentGlow: 'rgba(124,132,113,0.14)',
  superset: '#34C759',
  strainLow: '#7C8471',
  strainMid: '#D4A72C',
  strainHigh: '#C4432F',
  warmRed: '#C4432F',
  warmOrange: '#D4772C',
  navBg: 'rgba(255,255,255,0.95)',
  stickyBg: 'rgba(245,245,243,0.95)',
};

const DARK = {
  pageBg: '#0C0E0B',
  cardBg: 'rgba(22, 26, 18, 0.72)',
  cardSolid: '#14170F',
  border: 'rgba(255,255,255,0.07)',
  inputBg: '#0A0B08',
  textPrimary: '#F2F4EE',
  textSecondary: '#A9B09E',
  textMuted: '#8A9080',
  textFaint: '#565C4E',
  accent: '#B4D97E',
  accentHover: '#C8E88F',
  accentTint: 'rgba(180,217,126,0.12)',
  accentGlow: 'rgba(180,217,126,0.18)',
  superset: '#B4D97E',
  strainLow: '#B4D97E',
  strainMid: '#E8923E',
  strainHigh: '#E8543E',
  warmRed: '#E8543E',
  warmOrange: '#E8923E',
  navBg: 'rgba(9,10,8,0.9)',
  stickyBg: 'rgba(0,0,0,0.9)',
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
  { id: 'ex_rdelt', name: 'Rear Delt Fly (DB)', muscle: 'Shoulders', equipment: 'Dumbbell' },
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

  // --- Additional exercises ---
  // Shoulders / Rear Delts
  { id: 'ex_facepull', name: 'Face Pull', muscle: 'Shoulders', equipment: 'Cable' },
  { id: 'ex_cabrevfly', name: 'Cable Reverse Fly', muscle: 'Shoulders', equipment: 'Cable' },
  { id: 'ex_arnoldpress', name: 'Arnold Press', muscle: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'ex_cabuprightrow', name: 'Cable Upright Row', muscle: 'Shoulders', equipment: 'Cable' },
  { id: 'ex_dbfrontraise', name: 'DB Front Raise', muscle: 'Shoulders', equipment: 'Dumbbell' },

  // Back
  { id: 'ex_straightarmpd', name: 'Straight-Arm Pulldown', muscle: 'Back', equipment: 'Cable' },
  { id: 'ex_meadowsrow', name: 'Meadows Row', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex_sealrow', name: 'Seal Row', muscle: 'Back', equipment: 'Dumbbell' },
  { id: 'ex_inclinerow', name: 'Incline Dumbbell Row', muscle: 'Back', equipment: 'Dumbbell' },
  { id: 'ex_rackpull', name: 'Rack Pull', muscle: 'Back', equipment: 'Barbell' },
  { id: 'ex_trapbarshrug', name: 'Trap Bar Shrug', muscle: 'Back', equipment: 'Other' },

  // Chest
  { id: 'ex_lowcabfly', name: 'Low-to-High Cable Fly', muscle: 'Chest', equipment: 'Cable' },
  { id: 'ex_highcabfly', name: 'High-to-Low Cable Fly', muscle: 'Chest', equipment: 'Cable' },
  { id: 'ex_smithbench', name: 'Smith Machine Bench Press', muscle: 'Chest', equipment: 'Machine' },

  // Legs
  { id: 'ex_gobsquat', name: 'Goblet Squat', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex_walkinglunge', name: 'Walking Lunge', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex_slrdl', name: 'Single-Leg RDL', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex_dbrdl', name: 'Dumbbell RDL', muscle: 'Legs', equipment: 'Dumbbell' },
  { id: 'ex_glhameraise', name: 'Glute-Ham Raise', muscle: 'Legs', equipment: 'Machine' },
  { id: 'ex_cabledkick', name: 'Cable Donkey Kick', muscle: 'Legs', equipment: 'Cable' },
  { id: 'ex_stepup', name: 'Step-Up', muscle: 'Legs', equipment: 'Dumbbell' },

  // Arms
  { id: 'ex_spidercurl', name: 'Spider Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_revcurl', name: 'Reverse Curl', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex_crossbodycurl', name: 'Cross-Body Hammer Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_conccurl', name: 'Concentration Curl', muscle: 'Arms', equipment: 'Dumbbell' },
  { id: 'ex_ropepd', name: 'Rope Pushdown', muscle: 'Arms', equipment: 'Cable' },
  { id: 'ex_jmpress', name: 'JM Press', muscle: 'Arms', equipment: 'Barbell' },
  { id: 'ex_dbtriext', name: 'DB Tricep Kickback', muscle: 'Arms', equipment: 'Dumbbell' },

  // Core
  { id: 'ex_pallofpress', name: 'Pallof Press', muscle: 'Core', equipment: 'Cable' },
  { id: 'ex_sideplank', name: 'Side Plank', muscle: 'Core', equipment: 'Bodyweight' },
  { id: 'ex_toetobar', name: 'Toes-to-Bar', muscle: 'Core', equipment: 'Bodyweight' },
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

  // ── Block 2 ─────────────────────────────────────────────────
  {
    id: 'nip_b2_upper1', name: 'Upper 1', note: 'Nippard Min-Max · Block 2',
    scheduledDays: [0], // Mon
    exercises: [
      { exerciseId: 'ex_machchest', warmupRange: '2-4', workingSets: 3, repRange: '8-12', rirText: '2/1/0', restSeconds: 210, notes: 'Pause 1s at bottom. Full pec stretch.' },
      { exerciseId: 'ex_dbincbench', warmupRange: '1-2', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 120, notes: '~30° incline. Control the eccentric.' },
      { exerciseId: 'ex_lowcabfly', warmupRange: '0-1', workingSets: 3, repRange: '12-15', rirText: '1/1/0', restSeconds: 90, notes: 'Cable at ankle height. Palms up at bottom, rotate to face down at top.' },
      { exerciseId: 'ex_closelatpd', warmupRange: '2-3', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 150, notes: 'Lean back 15°. Drive elbows down and back.' },
      { exerciseId: 'ex_seatcabrow', warmupRange: '1-2', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 120, notes: 'Neutral grip. Squeeze shoulder blades at top.' },
      { exerciseId: 'ex_machlatr', warmupRange: '0-1', workingSets: 3, repRange: '12-15', rirText: '1/1/0', restSeconds: 90, notes: 'Squeeze lateral delt. Avoid shrugging.' },
      { exerciseId: 'ex_facepull', warmupRange: '0-1', workingSets: 3, repRange: '15-20', rirText: '1/0/0', restSeconds: 90, notes: 'Pull elbows up and out. External rotate at end range.' },
      { exerciseId: 'ex_bayesian', warmupRange: '0-1', workingSets: 3, repRange: '10-12', rirText: '1/0/0', restSeconds: 90, notes: 'Lean forward into stretch. Full elbow extension at bottom.' },
      { exerciseId: 'ex_ropepd', warmupRange: '0-1', workingSets: 3, repRange: '12-15', rirText: '1/0/0', restSeconds: 90, notes: 'Elbows pinned. Spread rope at bottom.' },
      { exerciseId: 'ex_cabcrunch', warmupRange: '0-1', workingSets: 3, repRange: '10-15', rirText: '1/0/0', restSeconds: 90, notes: 'Round lower back. Pause at bottom.' },
    ],
  },
  {
    id: 'nip_b2_lower1', name: 'Lower 1', note: 'Nippard Min-Max · Block 2',
    scheduledDays: [1], // Tue
    exercises: [
      { exerciseId: 'ex_seatlegc', warmupRange: '1-2', workingSets: 3, repRange: '10-15', rirText: '2/1/0', restSeconds: 90, notes: 'Full stretch at top of ROM. Control the eccentric.' },
      { exerciseId: 'ex_legp', warmupRange: '2-4', workingSets: 3, repRange: '10-15', rirText: '2/1/0', restSeconds: 180, notes: 'High and wide foot placement for quad/glute emphasis. Full depth.' },
      { exerciseId: 'ex_bulg', warmupRange: '1-2', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 180, notes: 'Keep torso upright. Minimize push-off from rear leg.' },
      { exerciseId: 'ex_lege', warmupRange: '1-2', workingSets: 3, repRange: '12-15', rirText: '1/1/0', restSeconds: 90, notes: 'Full stretch at bottom. Squeeze quads at top.' },
      { exerciseId: 'ex_lylegc', warmupRange: '0-1', workingSets: 2, repRange: '10-12', rirText: '1/0', restSeconds: 90, notes: 'Biggest stretch at bottom. Curl explosively, lower slowly.' },
      { exerciseId: 'ex_machabd', warmupRange: '0-1', workingSets: 2, repRange: '12-15', rirText: '1/0', restSeconds: 90, notes: 'Foam pad between knees to increase ROM.' },
      { exerciseId: 'ex_donkcalf', warmupRange: '0-1', workingSets: 3, repRange: '10-15', rirText: '1/1/0', restSeconds: 90, notes: '1-2s pause at bottom stretch. Full ankle extension.' },
    ],
  },
  {
    id: 'nip_b2_upper2', name: 'Upper 2', note: 'Nippard Min-Max · Block 2',
    scheduledDays: [3], // Thu
    exercises: [
      { exerciseId: 'ex_bench', warmupRange: '2-4', workingSets: 3, repRange: '8-12', rirText: '2/1/0', restSeconds: 210, notes: 'Tuck elbows 45°. Full ROM — touch chest lightly.' },
      { exerciseId: 'ex_cabfly', warmupRange: '1-2', workingSets: 3, repRange: '12-15', rirText: '2/1/0', restSeconds: 90, notes: 'Mid-height cables. Full stretch at bottom, squeeze at top.' },
      { exerciseId: 'ex_dbohp', warmupRange: '2-3', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 150, notes: 'Keep torso upright. Full overhead lockout.' },
      { exerciseId: 'ex_latpd', warmupRange: '2-3', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 150, notes: 'Lean back 15°. Pull to upper chest, squeeze lats.' },
      { exerciseId: 'ex_csuptbar', warmupRange: '1-2', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 120, notes: 'Flare elbows ~45°. Squeeze at top.' },
      { exerciseId: 'ex_cabrevfly', warmupRange: '0-1', workingSets: 3, repRange: '15-20', rirText: '1/1/0', restSeconds: 90, notes: 'Cables crossed. Sweep wide arcs. Squeeze rear delts.' },
      { exerciseId: 'ex_highcablatr', warmupRange: '0-1', workingSets: 3, repRange: '12-15', rirText: '1/0/0', restSeconds: 90, notes: 'Cable at hip height. Raise "out" not "up".' },
      { exerciseId: 'ex_inccurl', warmupRange: '0-1', workingSets: 3, repRange: '10-12', rirText: '1/1/0', restSeconds: 90, notes: 'Full stretch at bottom. Slow eccentric.' },
      { exerciseId: 'ex_ohtriext', warmupRange: '0-1', workingSets: 3, repRange: '12-15', rirText: '1/0/0', restSeconds: 90, notes: 'Full overhead stretch. Elbows fixed.' },
      { exerciseId: 'ex_hang', warmupRange: '0-1', workingSets: 3, repRange: '10-15', rirText: '1/0/0', restSeconds: 90, notes: 'Posterior tilt, curl hips up. Control the negative.' },
    ],
  },
  {
    id: 'nip_b2_lower2', name: 'Lower 2', note: 'Nippard Min-Max · Block 2',
    scheduledDays: [4], // Fri
    exercises: [
      { exerciseId: 'ex_rdl', warmupRange: '2-3', workingSets: 3, repRange: '8-12', rirText: '2/1/0', restSeconds: 180, notes: 'Bar close to legs throughout. Feel hamstring stretch at bottom.' },
      { exerciseId: 'ex_hacksq', warmupRange: '2-4', workingSets: 3, repRange: '10-12', rirText: '2/1/0', restSeconds: 180, notes: 'Feet shoulder-width, slight toe flare. Full depth.' },
      { exerciseId: 'ex_machhipth', warmupRange: '2-3', workingSets: 3, repRange: '10-15', rirText: '2/1/0', restSeconds: 150, notes: 'Squeeze glutes hard at top. Don\'t hyperextend lumbar.' },
      { exerciseId: 'ex_nordic', warmupRange: '0-1', workingSets: 3, repRange: '5-8', rirText: '2/1/0', restSeconds: 150, notes: 'Use hands to assist on the way up. Control the eccentric fully.' },
      { exerciseId: 'ex_seatlegc', warmupRange: '0-1', workingSets: 2, repRange: '12-15', rirText: '1/0', restSeconds: 90, notes: 'Squeeze quads at full extension.' },
      { exerciseId: 'ex_legpcalf', warmupRange: '0-1', workingSets: 3, repRange: '12-15', rirText: '1/1/0', restSeconds: 90, notes: 'Full plantarflexion. 1-2s pause at bottom.' },
    ],
  },
  {
    id: 'nip_b2_armsdelts', name: 'Arms / Delts', note: 'Nippard Min-Max · Block 2',
    scheduledDays: [5], // Sat
    exercises: [
      { exerciseId: 'ex_machpreach', warmupRange: '0-1', workingSets: 3, repRange: '10-12', rirText: '1/1/0', restSeconds: 90, notes: 'Full elbow extension at bottom. Squeeze hard at top.' },
      { exerciseId: 'ex_ohdbtri', warmupRange: '0-1', workingSets: 3, repRange: '10-12', rirText: '1/1/0', restSeconds: 90, notes: 'Full overhead stretch. Elbows fixed beside head.' },
      { exerciseId: 'ex_hcurl', warmupRange: '0-1', workingSets: 3, repRange: '10-12', rirText: '1/0/0', restSeconds: 90, notes: 'Neutral grip. Arc the dumbbell out, not up.' },
      { exerciseId: 'ex_seatdip', warmupRange: '0-1', workingSets: 3, repRange: '10-15', rirText: '1/1/0', restSeconds: 90, notes: 'Full elbow extension at bottom. Elbows tracking back.' },
      { exerciseId: 'ex_crossbodycurl', warmupRange: '0-1', workingSets: 2, repRange: '12-15', rirText: '1/0', restSeconds: 90, notes: 'Pull across body toward opposite shoulder. Control the eccentric.' },
      { exerciseId: 'ex_cabkickback', warmupRange: '0-1', workingSets: 2, repRange: '12-15', rirText: '1/0', restSeconds: 90, notes: 'Hinge at hip. Upper arm behind torso throughout.' },
      { exerciseId: 'ex_dbwrcurl', warmupRange: '0-1', workingSets: 2, repRange: '12-15', rirText: '1/0', restSeconds: 60, notes: 'Forearms on thighs. Full ROM.' },
      { exerciseId: 'ex_machlatr', warmupRange: '0-1', workingSets: 3, repRange: '12-15', rirText: '1/1/0', restSeconds: 90, notes: 'Squeeze side delt. No shrugging.' },
      { exerciseId: 'ex_facepull', warmupRange: '0-1', workingSets: 3, repRange: '15-20', rirText: '1/0/0', restSeconds: 90, notes: 'Pull elbows up and out. External rotate. Great for shoulder health.' },
    ],
  },
];

// ============================================================
//  NIPPARD LEGS/PUSH/PULL — 16-week periodized programme
//  (2 blocks x 8 weeks, weekly-varying sets/reps/RPE/%1RM)
// ============================================================
// Primary lifts (squat/bench/deadlift/ohp) are prescribed as %1RM.
// `pctOf1RM` is an array indexed by week (0-7) and `lift` names which
// oneRepMaxes key to multiply against. Everything else uses a fixed
// rep range + RPE/RIR text that doesn't change week to week, except
// where `setsOverride`/`repsOverride` arrays are given for weeks that
// deviate (e.g. extra sets added in later weeks).
const LPP_PROGRAMME = {
  id: 'nip_lpp',
  name: 'Nippard Legs/Push/Pull',
  note: 'Nippard LPP Hypertrophy · 16-week periodized programme',
  blocks: [
    {
      label: 'Block 1 · Technique Phase',
      weeks: 8,
      days: [
        {
          id: 'b1_legs1', name: 'Legs 1', scheduledDay: 0,
          exercises: [
            { exerciseId: 'ex_bsquat', name: 'Back Squat', lift: 'squat', sets: 3, setsOverride: { 5: 4, 6: 4 }, reps: '5', repsOverride: { 6: '6', 7: '6' }, pctOf1RM: [70, 75, 77.5, 80, 72.5, 72.5, 77.5, 80], rest: 210, notes: 'Sit back and down, 15° toe flare, drive your knees out laterally.' },
            { exerciseId: 'ex_rdl', name: 'Romanian Deadlift', sets: 2, setsOverride: { 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '8-10', rir: '7', rest: 210, notes: 'Keep your back flat, feel the stretch in your hamstrings on the eccentric.' },
            { exerciseId: 'ex_seatdeadl', name: 'Cable Pull Through', sets: 2, reps: '10-12', rir: '6→8', rest: 150, notes: 'Thrust your hips forward and squeeze your glutes.' },
            { exerciseId: 'ex_bulg', name: 'Dumbbell Walking Lunge', sets: 2, reps: '20 each leg', rir: '7→9', rest: 90, notes: 'Medium strides, minimize push-off from your rear leg.' },
            { exerciseId: 'ex_lege', name: 'Leg Extension', sets: 2, reps: '15', rir: '8→9', rest: 0, superset: 'b1_legs1_a', notes: 'Squeeze your quads to move the weight.' },
            { exerciseId: 'ex_seatlegc', name: 'Seated Leg Curl', sets: 2, reps: '15', rir: '8→9', rest: 90, superset: 'b1_legs1_a', notes: 'Squeeze your hamstrings to move the weight.' },
            { exerciseId: 'ex_stcalf', name: 'Standing Calf Raise', sets: 3, reps: '10', rir: '7', rest: 90, notes: 'Press all the way up, stretch at the bottom, no bouncing.' },
          ],
        },
        {
          id: 'b1_push1', name: 'Push 1', scheduledDay: 1,
          exercises: [
            { exerciseId: 'ex_bench', name: 'Barbell Bench Press', lift: 'bench', sets: 3, reps: '4', repsOverride: { 7: '5' }, pctOf1RM: [75, 80, 80, 85, 85, 85, 85, 85], rest: 150, notes: 'Tuck elbows 45°, squeeze shoulder blades, stay firm on the bench.' },
            { exerciseId: 'ex_dbohp', name: 'Dumbbell Seated Shoulder Press', sets: 3, reps: '8-10', rir: '7→8', rest: 150, notes: 'Bring the dumbbell all the way down, keep your torso upright.' },
            { exerciseId: 'ex_dip', name: 'Weighted Dip', sets: 2, reps: '6-10', rir: '7', rest: 90, notes: 'Tuck elbows 45°, lean torso forward 15°.' },
            { exerciseId: 'ex_cabfly', name: 'Low-to-High Cable Flye', sets: 2, setsOverride: { 6: 3 }, reps: '12-15', rir: '8→9', rest: 90, notes: 'Palms face ceiling to start; pull elbows up and in, rotating palms to face floor.' },
            { exerciseId: 'ex_skull', name: 'Dumbbell Isolateral Skull Crusher', sets: 3, setsOverride: { 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '12', rir: '8→9', rest: 90, notes: 'Elbows fixed in line with top of head, press over head, not over face.' },
            { exerciseId: 'ex_latr', name: 'Dumbbell Lateral Raise', sets: 3, reps: '15', rir: '8', rest: 90, notes: 'Raise the dumbbell "out" not "up" — mind-muscle connection with middle delts.' },
            { exerciseId: 'ex_abwh', name: 'Ab Wheel Rollout', sets: 3, reps: '6', rir: '7→8', rest: 90, notes: 'Squeeze glutes, keep lower back flat, cut ROM short if you lose position.' },
          ],
        },
        {
          id: 'b1_pull1', name: 'Pull 1', scheduledDay: 2,
          exercises: [
            { exerciseId: 'ex_1armcab', name: '1 Arm Lat Pull-In', sets: 2, reps: '15-20', rir: '5', rest: 90, notes: 'Light sets — drive elbow down and in toward your side.' },
            { exerciseId: 'ex_pullup', name: 'Pull-Up', sets: 4, reps: '6-8', rir: '8', rest: 150, notes: 'Pull elbows down and in, minimize swinging.' },
            { exerciseId: 'ex_brow', name: 'Pendlay Row', sets: 3, reps: '8-10', rir: '8', rest: 150, notes: 'Initiate by squeezing shoulder blades, pull to lower chest, avoid momentum.' },
            { exerciseId: 'ex_closelatpd', name: 'Machine High Row', sets: 3, reps: '10-12', rir: '8→9', rest: 90, notes: 'Focus on squeezing your lats.' },
            { exerciseId: 'ex_rdelt', name: 'Seated Face Pull', sets: 3, reps: '20', rir: '8→9', rest: 90, notes: 'Pull elbows up and out, squeeze shoulder blades together.' },
            { exerciseId: 'ex_ezcurl', name: 'Reverse Grip EZ Bar Curl', sets: 3, reps: '20', rir: '9→10', rest: 0, superset: 'b1_pull1_a', notes: 'Arc the bar "out" not "up" — focus on squeezing forearms.' },
            { exerciseId: 'ex_bcurl', name: 'Supinated EZ Bar Curl', sets: 3, reps: '15', rir: '9→10', rest: 90, superset: 'b1_pull1_a', notes: 'Arc the bar "out" not "up" — focus on squeezing biceps.' },
            { exerciseId: 'ex_dbpreach', name: 'Dumbbell Preacher Curl', sets: 3, reps: '12', rir: '7→8', rest: 90, notes: 'Squeeze your biceps to move the weight.' },
          ],
        },
        {
          id: 'b1_legs2', name: 'Legs 2', scheduledDay: 3,
          exercises: [
            { exerciseId: 'ex_dead', name: 'Deadlift', lift: 'deadlift', sets: 4, setsOverride: { 7: 3 }, reps: '4', repsOverride: { 5: '5', 6: '5', 7: '6' }, pctOf1RM: [72.5, 77.5, 80, 82.5, 72.5, 75, 77.5, 80], rest: 210, notes: 'Brace lats, chest tall, hips high — pull the slack out of the bar before it moves.' },
            { exerciseId: 'ex_fsquat', name: 'Front Squat', sets: 3, reps: '6-8', rir: '6-7', rest: 150, notes: 'Sit down, 15° toe flare, drive knees out laterally.' },
            { exerciseId: 'ex_legp', name: 'Single-Leg Leg Press', sets: 2, reps: '10-12', rir: '7→8', rest: 90, notes: 'High foot placement.' },
            { exerciseId: 'ex_lege', name: 'Single-Leg Leg Extension', sets: 3, reps: '15', rir: '7→8', rest: 90, notes: 'Start with your weaker leg — squeeze your quads to move the weight.' },
            { exerciseId: 'ex_nordic', name: 'Swiss Ball Single-Leg Leg Curl', sets: 3, reps: '12', rir: '7→8', rest: 90, notes: 'Start with weaker leg, keep hips off the ground.' },
            { exerciseId: 'ex_stcalf', name: 'Seated Calf Raise', sets: 3, reps: '15', rir: '7→8', rest: 90, notes: 'Press all the way up, stretch at the bottom, no bouncing.' },
          ],
        },
        {
          id: 'b1_push2', name: 'Push 2', scheduledDay: 4,
          exercises: [
            { exerciseId: 'ex_closebench', name: 'Close-Grip Bench Press', sets: 3, reps: '6-8', rir: '7-8', rest: 150, notes: 'Shoulder-width grip, elbows down at your sides.' },
            { exerciseId: 'ex_ohp', name: 'Overhead Press', lift: 'ohp', sets: 3, reps: '5-6', pctOf1RM: [80, 80.5, 81, 81.5, 82, 82, 82.5, 82.5], rest: 150, notes: 'Squeeze glutes to stay upright, clear your head, press up and slightly back.' },
            { exerciseId: 'ex_dbincbench', name: 'Dumbbell Incline Press', sets: 3, reps: '10-12', rir: '7-8', rest: 90, notes: '~45° incline — mind-muscle connection with upper pecs.' },
            { exerciseId: 'ex_pecdeck', name: 'Pec Deck', sets: 2, setsOverride: { 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '15', rir: '7-8', rest: 90, notes: 'Bring your inner elbows together, not your hands.' },
            { exerciseId: 'ex_cablatr', name: 'Cable Lateral Raise', sets: 3, setsOverride: { 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '8', rir: '8-9', rest: 90, notes: 'Squeeze your lateral delt to move the weight.' },
            { exerciseId: 'ex_cabkickback', name: 'Cable Triceps Kickback', sets: 3, reps: '20', rir: '8-9', rest: 90, notes: 'Stand upright, elbows behind your torso.' },
            { exerciseId: 'ex_cabcrunch', name: 'Bicycle Crunch', sets: 3, reps: '12', rir: '7-8', rest: 90, notes: 'Opposite knee to elbow, focus on flexing your spine.' },
          ],
        },
        {
          id: 'b1_pull2', name: 'Pull 2', scheduledDay: 5,
          exercises: [
            { exerciseId: 'ex_closelatpd', name: 'Neutral-Grip Pulldown', sets: 3, setsOverride: { 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '10-12', rir: '8', rest: 150, notes: 'Pull your elbows down against your sides.' },
            { exerciseId: 'ex_seatcabrow', name: 'Cable Seated Elbows-Out Row', sets: 3, reps: '10', rir: '8', rest: 0, superset: 'b1_pull2_a', notes: 'Squeeze shoulder blades together, pull with elbows up and out.' },
            { exerciseId: 'ex_seatcabrow', name: 'Cable Seated Row', sets: 3, reps: '10', rir: '8', rest: 150, superset: 'b1_pull2_a', notes: 'Squeeze shoulder blades together, pull with elbows down and in.' },
            { exerciseId: 'ex_dbfly', name: 'Kneeling Straight-Arm Cable Pull-Over', sets: 3, reps: '15', rir: '7', rest: 90, notes: 'Lean torso 45°, pull the weight straight down, not "in".' },
            { exerciseId: 'ex_bbshrug', name: 'Snatch Grip Barbell Shrug', sets: 3, reps: '15', rir: '8', rest: 90, notes: '1.5x shoulder-width grip — "shrug up to your ears".' },
            { exerciseId: 'ex_rdelt', name: 'Cable Reverse Flye', sets: 3, reps: '20', rir: '8', rest: 90, notes: 'Sweep the weight out laterally.' },
            { exerciseId: 'ex_bayesian', name: 'Single-Arm Cable Curl', sets: 3, reps: '12', rir: '7→9', rest: 90, notes: 'Stand upright, keep elbow behind your torso.' },
            { exerciseId: 'ex_hcurl', name: 'Hammer Curl', sets: 3, reps: '8', rir: '7→9', rest: 90, notes: 'Squeeze your biceps to move the weight.' },
          ],
        },
      ],
    },
    {
      label: 'Block 2 · Peaking Phase (Week 1 = Deload)',
      weeks: 8,
      days: [
        {
          id: 'b2_legs1', name: 'Legs 1', scheduledDay: 0,
          exercises: [
            { exerciseId: 'ex_dead', name: 'Deadlift', lift: 'deadlift', sets: 4, setsOverride: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5 }, reps: '3', repsOverride: { 7: 'RPE9 test, 1 rep' }, pctOf1RM: [75, 80, 80, 82.5, 82.5, 85, 85, 90], rest: 210, notes: 'Wk8: load 90% and do an RPE9 test — leave 1 in the tank, perfect form.' },
            { exerciseId: 'ex_bsquat', name: 'Tempo Back Squat', sets: 2, reps: '6', pctOf1RM: [60, 60, 65, 65, 67.5, 67.5, 70, 70], rest: 210, notes: 'Full 2-second lowering phase. Sit back and down, 15° toe flare.' },
            { exerciseId: 'ex_45hyp', name: 'Round-Back DB 45° Hyperextension', sets: 2, reps: '20', rir: '7-8', rest: 90, notes: 'Upper back rounded, drive hips into the pad like a hip thrust.' },
            { exerciseId: 'ex_smithlunge', name: 'Smith Machine Reverse Lunge', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '15', rir: '7-9', rest: 90, notes: 'Sit back, start with your weaker leg.' },
            { exerciseId: 'ex_lege', name: 'Enhanced-Eccentric Leg Extension', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '12', rir: '6-9', rest: 90, notes: 'Partner pushes down on the pad during the eccentric.' },
            { exerciseId: 'ex_lylegc', name: 'Enhanced-Eccentric Lying Leg Curl', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '12', rir: '6-9', rest: 90, notes: 'Partner pushes down on the pad during the eccentric.' },
            { exerciseId: 'ex_machabd', name: 'Lateral Band Walk', sets: 2, reps: '15', rir: '8', rest: 90, notes: 'Or machine hip abduction — drive your knees out.' },
            { exerciseId: 'ex_stcalf', name: 'Tempo Standing Calf Raise', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '8', rir: '6-8', rest: 90, notes: '2-second lowering phase. Press all the way up, stretch at bottom.' },
          ],
        },
        {
          id: 'b2_push1', name: 'Push 1', scheduledDay: 1,
          exercises: [
            { exerciseId: 'ex_bench', name: 'Barbell Bench Press', lift: 'bench', sets: 2, setsOverride: { 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '8', repsOverride: { 7: 'AMRAP, 1 set' }, pctOf1RM: [75, 72.5, 75, 75, 77.5, 77.5, 77.5, 85], rest: 150, notes: 'Wk8: AMRAP — always use a spotter and good form.' },
            { exerciseId: 'ex_ohp', name: 'Arnold Press', sets: 2, reps: '12', rir: '7-9', rest: 90, notes: 'Start palms in, rotate to face out as you press up.' },
            { exerciseId: 'ex_closebench', name: 'Close-Grip Smith Machine Press', sets: 2, reps: '15', rir: '7-9', rest: 90, notes: 'Shoulder-width grip, elbows down at your sides.' },
            { exerciseId: 'ex_cabfly', name: 'Low-to-High Cable Flye', sets: 2, reps: '15-20', rir: '8-10', rest: 90, notes: 'Palms face ceiling to start, pull elbows up and in.' },
            { exerciseId: 'ex_skull', name: 'Barbell Floor Skull Crusher', sets: 2, reps: '8-10', rir: '7-9', rest: 90, notes: 'Push shoulder blades forward, elbows fixed, only move at the elbow.' },
            { exerciseId: 'ex_latr', name: 'Egyptian Lateral Raise', sets: 2, reps: '12-15', rir: '8', rest: 90, notes: 'Lean away from the cable, squeeze your delts.' },
            { exerciseId: 'ex_ohtriext', name: 'Rope Overhead Triceps Extension', sets: 2, reps: '12-15', rir: '7-9', rest: 90, notes: 'Stretch your triceps at the bottom of the movement.' },
            { exerciseId: 'ex_hang', name: 'Hanging Leg Raise', sets: 3, reps: '6', rir: '6-7', rest: 90, notes: 'Focus on flexing your spine.' },
          ],
        },
        {
          id: 'b2_pull1', name: 'Pull 1', scheduledDay: 2,
          exercises: [
            { exerciseId: 'ex_1armcab', name: '1 Arm Lat Pull-In', sets: 2, reps: '15-20', rir: '5', rest: 90, notes: 'Light sets — drive elbow down and in toward your side.' },
            { exerciseId: 'ex_pullup', name: 'Pull-Up', sets: 3, reps: '12', rir: '7→9', rest: 150, notes: 'Add weight or use assistance as needed.' },
            { exerciseId: 'ex_dbrow', name: 'Dumbbell One-Arm Row', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '6-8', rir: '7→9', rest: 90, notes: 'Brace with your non-working arm, pull back at your sides.' },
            { exerciseId: 'ex_csuptbar', name: 'Chest-Supported T-Bar Row w/ Band', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '10-12', rir: '7→9', rest: 90, notes: 'Loop a band around the weight for extra tension at the top.' },
            { exerciseId: 'ex_rdelt', name: 'Cable Reverse Flye', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '12-15', rir: '8-9', rest: 90, notes: 'Sweep out and back, mind-muscle connection with rear delts.' },
            { exerciseId: 'ex_revcabxo', name: 'Rope Upright Row', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '20', rir: '8-9', rest: 90, notes: 'Squeeze your upper traps at the top, initiate the movement "out".' },
            { exerciseId: 'ex_dbcurl', name: 'Dumbbell Supinated Curl', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '12-15', rir: '7-9', rest: 90, notes: 'Drive your pinky toward your lateral delt.' },
            { exerciseId: 'ex_dbpreach', name: 'Spider Curl', sets: 3, reps: '15-20', rir: '8', rest: 90, notes: 'Brace your chest against an incline bench, elbows slightly in front.' },
          ],
        },
        {
          id: 'b2_legs2', name: 'Legs 2', scheduledDay: 3,
          exercises: [
            { exerciseId: 'ex_bsquat', name: 'Back Squat', lift: 'squat', sets: 3, setsOverride: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '4-5', pctOf1RM: [75, 75, 77.5, 77.5, 80, 80, 82.5, 82.5], rest: 210, notes: 'Sit back and down, 15° toe flare, drive knees out laterally.' },
            { exerciseId: 'ex_rdl', name: 'Romanian Deadlift', sets: 3, reps: '10-12', rir: '7-8', rest: 150, notes: 'Keep your back flat, feel the hamstring stretch on the eccentric.' },
            { exerciseId: 'ex_bbhipth', name: 'Pause Barbell Hip Thrust', sets: 2, reps: '10', rir: '7-9', rest: 150, notes: '3-second pause, tuck chin/ribs down, only move your hips, use a pad.' },
            { exerciseId: 'ex_sissy', name: 'Slow Eccentric Goblet Squat', sets: 2, reps: '12', rir: '6-8', rest: 90, notes: '3-second lowering phase, sit down, knees out, torso upright.' },
            { exerciseId: 'ex_seatlegc', name: 'Seated Leg Curl', sets: 2, reps: '15', rir: '8-9', rest: 90, notes: 'Squeeze your hamstrings to move the weight.' },
            { exerciseId: 'ex_seatdeadl', name: 'Cable Rope Pullthrough', sets: 2, reps: '20', rir: '8', rest: 90, notes: 'Squeeze your glutes to move the weight.' },
            { exerciseId: 'ex_stcalf', name: 'Standing Calf Raise', sets: 3, reps: '12', rir: '7-8', rest: 90, notes: 'Press all the way up, stretch at bottom, no bouncing.' },
          ],
        },
        {
          id: 'b2_push2', name: 'Push 2', scheduledDay: 4,
          exercises: [
            { exerciseId: 'ex_bench', name: 'Barbell Bench Press', lift: 'bench', sets: 3, setsOverride: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '4-5', pctOf1RM: [75, 75, 76, 76, 77, 77, 77.5, 77.5], rest: 150, notes: 'Tuck elbows 45°, squeeze shoulder blades, stay firm on the bench.' },
            { exerciseId: 'ex_ohp', name: 'Overhead Press / Push Press Complex', lift: 'ohp', sets: 3, reps: '4+4', pctOf1RM: [72.5, 72.5, 77.5, 77.5, 80, 80, 82.5, 82.5], rest: 150, notes: 'First 4 reps strict overhead press, last 4 reps push press (use leg drive).' },
            { exerciseId: 'ex_dip', name: 'Slow Eccentric Dip', sets: 2, setsOverride: { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }, reps: '8-10', rir: '6-8', rest: 90, notes: '3-second lowering phase, tuck elbows 45°, lean forward 15°.' },
            { exerciseId: 'ex_tpush', name: 'Triceps V-Bar Pressdown', sets: 3, reps: '12-15', rir: '7-9', rest: 90, notes: 'Squeeze your triceps to move the weight.' },
            { exerciseId: 'ex_machlatr', name: 'Machine Lateral Raise', sets: 3, reps: '15-20', rir: '8-9', rest: 90, notes: 'Squeeze your lateral delt to move the weight.' },
            { exerciseId: 'ex_plank', name: 'Plank', sets: 3, reps: '30 sec', rir: '7', rest: 90, notes: 'Keep your back flat, squeeze your glutes and abs.' },
          ],
        },
        {
          id: 'b2_pull2', name: 'Pull 2', scheduledDay: 5,
          exercises: [
            { exerciseId: 'ex_1armcab', name: 'Single-Arm Pulldown', sets: 3, reps: '12', rir: '7→9', rest: 150, notes: 'Start with your weaker side, stretch your lat at the top.' },
            { exerciseId: 'ex_dbrow', name: 'Seal Row', sets: 3, reps: '8-10', rir: '7-8', rest: 150, notes: 'Dumbbells or barbell — squeeze glutes to keep your torso stable.' },
            { exerciseId: 'ex_dbfly', name: 'Kneeling Straight-Arm Cable Pull-Over', sets: 3, reps: '15-20', rir: '8-9', rest: 90, notes: 'Lean torso 45°, pull the weight straight down, not "in".' },
            { exerciseId: 'ex_rpec1', name: 'Reverse Pec Deck', sets: 3, reps: '15', rir: '7-9', rest: 90, notes: 'Sweep your arms out laterally — mind-muscle connection with rear delts.' },
            { exerciseId: 'ex_dbcurl', name: 'Dumbbell Pronated Curl', sets: 3, setsOverride: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '8', rir: '9→10', rest: 0, superset: 'b2_pull2_a', notes: 'Arc the dumbbell "out" not "up" — squeeze forearms.' },
            { exerciseId: 'ex_hcurl', name: 'Dumbbell Hammer Curl', sets: 3, setsOverride: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '8', rir: '9→10', rest: 0, superset: 'b2_pull2_a', notes: 'Arc the dumbbell "out" not "up" — squeeze forearms.' },
            { exerciseId: 'ex_dbcurl', name: 'Dumbbell Supinated Curl', sets: 3, setsOverride: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4 }, reps: '8', rir: '9→10', rest: 90, superset: 'b2_pull2_a', notes: 'Arc the dumbbell "out" not "up" — squeeze biceps.' },
          ],
        },
      ],
    },
  ],
};

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

// Millisecond timestamp of Monday 00:00 for the week containing `ref` (default now).
const startOfWeekMs = (ref = new Date()) => {
  const d = new Date(ref); const wd = d.getDay() || 7;
  d.setDate(d.getDate() - wd + 1); d.setHours(0, 0, 0, 0);
  return d.getTime();
};

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

const buildGeminiPrompt = (workout, exerciseDefs = []) => {
  const date = new Date(workout.startedAt);
  const dateStr = date.toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' });
  const endStr = workout.finishedAt
    ? new Date(workout.finishedAt).toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' })
    : null;
  const durationStr = fmtDuration(workout.duration);

  const muscles = [...new Set(
    workout.exercises.map(ex => {
      const def = exerciseDefs.find(e => e.id === ex.exerciseId);
      return def?.muscle;
    }).filter(Boolean)
  )];

  const totalVolume = Math.round(volumeOf(workout, exerciseDefs));
  const totalWorkingSets = workout.exercises.reduce((n, ex) => n + workingSetsOf(ex).length, 0);

  const exerciseLines = workout.exercises.map((ex, i) => {
    const def = exerciseDefs.find(e => e.id === ex.exerciseId);
    const meta = [def?.muscle, def?.equipment].filter(Boolean).join(' · ');
    const header = `${i + 1}. ${ex.name}${meta ? ` (${meta})` : ''}`;

    const workingSets = workingSetsOf(ex);
    const setLines = workingSets.map((s, j) => {
      const rpe = s.rir != null ? `@ RPE ${10 - s.rir}` : '';
      return `   • Set ${j + 1}: ${s.weight} kg × ${s.reps} reps${rpe ? ' ' + rpe : ''}`;
    });

    const warmups = ex.sets.filter(s => s.type === 'warmup');
    const warmupNote = warmups.length > 0 ? `   (+ ${warmups.length} warm-up set${warmups.length > 1 ? 's' : ''})` : '';

    return [header, ...setLines, ...(warmupNote ? [warmupNote] : [])].join('\n');
  }).join('\n\n');

  return `I completed a strength training session. Please log this workout and update my strength tracking.

WORKOUT: ${workout.name}
DATE: ${dateStr}
TIME: ${timeStr}${endStr ? ` – ${endStr}` : ''} (${durationStr})

EXERCISES PERFORMED:

${exerciseLines}

SUMMARY:
Total volume: ${totalVolume.toLocaleString()} kg
Working sets: ${totalWorkingSets}
Muscles targeted: ${muscles.join(', ')}

Note: RPE values are derived from RIR (Reps In Reserve) as RPE = 10 − RIR. Sets where RIR was not recorded show no RPE.`;
};

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

// Round to nearest usable plate increment (2.5kg)
const roundToPlate = (kg) => Math.round(kg / 2.5) * 2.5;

// Resolves a programme day's exercise prescriptions for a specific week (0-indexed) into
// concrete weights, given the athlete's 1RMs. Returns objects shaped like RoutineEditor's
// exercise entries so they can flow through the same startFromRoutine path.
const resolveProgrammeDay = (day, weekIdx, oneRepMaxes = {}) => {
  return day.exercises.map((ex) => {
    const sets = ex.setsOverride?.[weekIdx] ?? ex.sets;
    const reps = ex.repsOverride?.[weekIdx] ?? ex.reps;
    let weightHint = null;
    let rirText = ex.rir || '';
    if (ex.pctOf1RM) {
      const pct = ex.pctOf1RM[weekIdx];
      const oneRM = oneRepMaxes[ex.lift];
      weightHint = oneRM ? roundToPlate((pct / 100) * oneRM) : null;
      rirText = `${pct}% 1RM`;
    }
    return { ...ex, sets, reps, rirText, weightHint };
  });
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

// Parses "6-8" -> {min:6,max:8}, "8" -> {min:8,max:8}. Non-numeric (e.g. "Time", "AMRAP") -> null.
const parseRepRange = (repRange) => {
  if (!repRange) return null;
  const match = String(repRange).match(/(\d+)\s*-\s*(\d+)/);
  if (match) return { min: parseInt(match[1]), max: parseInt(match[2]) };
  const single = String(repRange).match(/^\d+$/);
  return single ? { min: parseInt(single[0]), max: parseInt(single[0]) } : null;
};

// Parses the lowest (hardest/most-fatigued) RIR target from strings like "2/1/0", "1-0", "7-8" (RPE-style, ignored), "0".
// Only handles small RIR-scale numbers (0-4); returns null if it can't confidently parse one.
const parseTargetRIR = (rirText) => {
  if (!rirText) return null;
  const nums = String(rirText).match(/\d+(\.\d+)?/g);
  if (!nums) return null;
  const vals = nums.map(Number).filter(n => n <= 4);
  return vals.length ? Math.min(...vals) : null;
};

// Weight increment suggested per bump, by broad exercise category.
// Barbell compounds tolerate bigger jumps; dumbbells/cables/machines climb in smaller steps.
const suggestIncrement = (equipment) => equipment === 'Barbell' ? 5 : 2.5;

// Looks at the last few sessions of an exercise and suggests progress/back-off/hold.
// Only applies to fixed rep-range work (repRange + rirTarget) — %1RM-prescribed programme
// lifts carry their own periodized progression and are deliberately excluded by callers
// (they won't have a usable repRange/rirTarget from resolveProgrammeDay's pctOf1RM path).
const suggestProgression = (workouts, exerciseId, repRange, rirTarget, equipment) => {
  const range = parseRepRange(repRange);
  const targetRIR = parseTargetRIR(rirTarget);
  if (!range || targetRIR == null) return null;

  const sessions = [];
  for (const w of workouts) {
    const ex = w.exercises.find(e => e.exerciseId === exerciseId);
    if (!ex) continue;
    const working = ex.sets.filter(isStatSet);
    if (working.length === 0) continue;
    sessions.push(working);
    if (sessions.length === 2) break;
  }
  if (sessions.length === 0) return null;

  const hitTop = (sets) => sets.every(s => (s.reps || 0) >= range.max && (s.rir ?? 99) <= targetRIR);
  const missedBottom = (sets) => sets.some(s => (s.reps || 0) < range.min);
  const groundHarder = (sets) => sets.some(s => s.rir != null && s.rir < targetRIR - 1 && s.rir <= 0);

  const latest = sessions[0];
  const latestWeight = Math.max(...latest.map(s => s.weight || 0));

  if (sessions.length >= 2 && sessions.every(hitTop)) {
    const inc = suggestIncrement(equipment);
    return { type: 'progress', suggestedWeight: roundToPlate(latestWeight + inc), reason: `Beat top of range at target RIR for ${sessions.length} sessions straight` };
  }
  if (missedBottom(latest) || groundHarder(latest)) {
    return { type: 'back-off', reason: missedBottom(latest) ? 'Missed the bottom of the rep range last session' : 'Ground out harder than target RIR last session' };
  }
  return null;
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
  darkMode: true,
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('home');
  const [exercises, setExercises] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [completedWorkout, setCompletedWorkout] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [activeProgramme, setActiveProgramme] = useState(null); // { programmeId, block, week } (block/week 0-indexed)
  const [oneRepMaxes, setOneRepMaxes] = useState({});

  useEffect(() => {
    (async () => {
      const [ex, rt, wk, act, set, prog, orms] = await Promise.all([
        storage.get('gym:exercises', null),
        storage.get('gym:routines', []),
        storage.get('gym:workouts', []),
        storage.get('gym:active', null),
        storage.get('gym:settings', DEFAULT_SETTINGS),
        storage.get('gym:programme', null),
        storage.get('gym:oneRepMaxes', {}),
      ]);
      const saved = ex || [];
      const merged = [...saved];
      for (const s of SEED_EXERCISES) if (!merged.some(x => x.id === s.id)) merged.push(s);
      setExercises(merged);
      if (!ex) storage.set('gym:exercises', merged);
      setRoutines(rt); setWorkouts(wk); setActiveWorkout(act);
      setSettings({ ...DEFAULT_SETTINGS, ...set });
      setActiveProgramme(prog); setOneRepMaxes(orms);
      setLoading(false);
    })();
  }, []);

  useEffect(() => { if (!loading) storage.set('gym:exercises', exercises); }, [exercises, loading]);
  useEffect(() => { if (!loading) storage.set('gym:routines', routines); }, [routines, loading]);
  useEffect(() => { if (!loading) storage.set('gym:workouts', workouts); }, [workouts, loading]);
  useEffect(() => { if (!loading) storage.set('gym:active', activeWorkout); }, [activeWorkout, loading]);
  useEffect(() => { if (!loading) storage.set('gym:settings', settings); }, [settings, loading]);
  useEffect(() => { if (!loading) storage.set('gym:programme', activeProgramme); }, [activeProgramme, loading]);
  useEffect(() => { if (!loading) storage.set('gym:oneRepMaxes', oneRepMaxes); }, [oneRepMaxes, loading]);

  // Notification scheduler: checks once a minute whether to fire today's reminder
  useEffect(() => {
    if (loading) return;
    if (!settings.notificationsEnabled) return;

    const tick = async () => {
      const todayIdx = getTodayIdx();
      const todayKey = new Date().toISOString().slice(0, 10);

      // Prefer the active programme's session for today; fall back to a scheduled routine.
      let sessionName = null;
      if (activeProgramme) {
        const block = LPP_PROGRAMME.blocks[activeProgramme.block];
        const day = block?.days.find(d => d.scheduledDay === todayIdx);
        if (day) {
          const doneThisWeek = workouts.some(w => w.programmeDayId === day.id && new Date(w.startedAt).getTime() >= startOfWeekMs());
          if (!doneThisWeek) sessionName = day.name;
        }
      }
      if (!sessionName) {
        const matched = routines.find(r => (r.scheduledDays || []).includes(todayIdx));
        if (matched) sessionName = matched.name;
      }
      if (!sessionName) return;

      const [hh, mm] = (settings.notificationTime || '08:00').split(':').map(Number);
      const now = new Date();
      const past = now.getHours() > hh || (now.getHours() === hh && now.getMinutes() >= mm);
      if (!past) return;

      const lastFired = await storage.get('gym:lastNotified', null);
      if (lastFired === todayKey) return;

      const ok = fireNotification('Smacht', `Today's session: ${sessionName}`);
      if (ok) await storage.set('gym:lastNotified', todayKey);
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [loading, routines, activeProgramme, workouts, settings.notificationsEnabled, settings.notificationTime]);

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

  const startFromProgrammeDay = (day, weekIdx, weekLabel) => {
    const resolved = resolveProgrammeDay(day, weekIdx, oneRepMaxes);
    setActiveWorkout({
      id: uid(), name: `${day.name} · ${weekLabel}`, programmeDayId: day.id,
      startedAt: new Date().toISOString(),
      exercises: resolved.map((re) => {
        const ex = exercises.find((e) => e.id === re.exerciseId);
        const lastSets = findLastSetsFor(workouts, re.exerciseId);
        const workingCount = re.sets || 3;
        const sets = [];
        for (let i = 0; i < workingCount; i++) {
          sets.push({
            type: 'working',
            weight: re.weightHint ?? (lastSets[i]?.weight || 0),
            reps: lastSets[i]?.reps || 0,
            rir: null, completed: false,
          });
        }
        return {
          exerciseId: re.exerciseId, name: ex?.name || re.name,
          sets, notes: re.notes || '',
          repRange: re.reps, rirTarget: re.rirText,
          restSeconds: re.rest || 90,
          supersetGroup: re.superset || null,
        };
      }),
    });
  };

  const finishWorkout = (override) => {
    const src = override || activeWorkout;
    if (!src) return;
    const finishedAt = new Date().toISOString();
    const duration = Math.floor((new Date(finishedAt) - new Date(src.startedAt)) / 1000);
    const completed = {
      ...src, finishedAt, duration,
      exercises: src.exercises
        .map((ex) => ({ ...ex, sets: ex.sets.filter((s) => s.completed) }))
        .filter((ex) => ex.sets.length > 0),
    };
    if (completed.exercises.length === 0) { setActiveWorkout(null); return; }
    setWorkouts((prev) => [completed, ...prev]);
    setActiveWorkout(null);
    setCompletedWorkout(completed);
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
          {tab === 'home' && <HomeTab workouts={workouts} routines={routines} exercises={exercises} settings={settings} setSettings={setSettings} onStartEmpty={startEmptyWorkout} onStartRoutine={startFromRoutine} onCreateRoutine={() => setTab('routines')} onOpenSettings={() => setShowSettings(true)} activeProgramme={activeProgramme} setActiveProgramme={setActiveProgramme} oneRepMaxes={oneRepMaxes} setOneRepMaxes={setOneRepMaxes} onStartProgrammeDay={startFromProgrammeDay} />}
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
        {completedWorkout && (
          <GeminiCopyModal
            workout={completedWorkout}
            exercises={exercises}
            onClose={() => setCompletedWorkout(null)}
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
      <div className="text-3xl font-bold leading-none num" style={{ color: C.textPrimary }}>{value}</div>
      <div className="text-[10px] mt-1" style={{ color: C.textMuted }}>{unit}</div>
    </div>
  );
}

// Whoop-style circular progress ring. `pct` is 0-100.
function RingGauge({ pct, size = 168, stroke = 14, color, label, value, unit }) {
  const C = useContext(ThemeContext);
  const clamped = Math.max(0, Math.min(100, pct));
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - clamped / 100);
  const ringColor = color || C.accent;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 block">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={ringColor} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease', filter: `drop-shadow(0 0 10px ${ringColor}88)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-extrabold leading-none num" style={{ color: C.textPrimary, letterSpacing: '-0.03em', fontSize: size * 0.3 }}>{value}</div>
        {unit && <div className="mt-1 uppercase tracking-wider" style={{ color: C.textMuted, fontSize: size * 0.065 }}>{unit}</div>}
        {label && <div className="mt-2 uppercase tracking-[0.2em] font-bold" style={{ color: ringColor, fontSize: size * 0.06 }}>{label}</div>}
      </div>
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
//  HOME TAB — dark charcoal + aura-glow dashboard
// ============================================================
function MetricCard({ children, className = '', as = 'div', style = {}, ...rest }) {
  const C = useContext(ThemeContext);
  const Tag = as;
  return (
    <Tag
      className={`rounded-3xl p-5 ${className}`}
      style={{ background: C.cardBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function CardLabel({ dot, children }) {
  const C = useContext(ThemeContext);
  return (
    <div className="flex items-center gap-2 mb-3 text-[10.5px] uppercase tracking-[0.16em]" style={{ color: C.textMuted }}>
      {dot && <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: dot }} />}
      {children}
    </div>
  );
}

function MetricTile({ dot, label, value, unit }) {
  const C = useContext(ThemeContext);
  return (
    <MetricCard className="flex-1">
      <CardLabel dot={dot}>{label}</CardLabel>
      <div className="num font-extrabold leading-none" style={{ color: C.textPrimary, fontSize: 26, letterSpacing: '-0.02em' }}>
        {value}{unit && <span className="font-semibold ml-1" style={{ color: C.textMuted, fontSize: 13 }}>{unit}</span>}
      </div>
    </MetricCard>
  );
}

function PrimaryCTA({ C, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 active:scale-[0.99] transition"
      style={{ background: `linear-gradient(160deg, ${C.accentHover}, ${C.accent})`, color: '#10140C', boxShadow: `0 12px 30px -12px ${C.accentGlow}` }}
    >
      <Play size={16} fill="currentColor" /> {label}
    </button>
  );
}

// Subtle top-anchored aura for secondary screens (dark theme only)
function ScreenAura() {
  const C = useContext(ThemeContext);
  if (C.pageBg !== '#0C0E0B') return null;
  return (
    <div
      className="pointer-events-none fixed left-1/2 -top-24 -translate-x-1/2 z-0"
      style={{ width: 420, height: 320, filter: 'blur(70px)', opacity: 0.5 }}
    >
      <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle at 40% 40%, ${C.accentHover} 0%, transparent 46%), radial-gradient(circle at 68% 50%, ${C.warmOrange} 0%, transparent 48%)` }} />
    </div>
  );
}

// Shared screen title with eyebrow + gradient wordmark treatment
function TabTitle({ eyebrow, children, action }) {
  const C = useContext(ThemeContext);
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        {eyebrow && <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: C.textMuted }}>{eyebrow}</div>}
        <h1 className="text-3xl font-extrabold leading-none" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>{children}</h1>
      </div>
      {action}
    </div>
  );
}

function HomeTab({ workouts, routines, exercises, settings, setSettings, onStartEmpty, onStartRoutine, onCreateRoutine, onOpenSettings, activeProgramme, setActiveProgramme, oneRepMaxes, setOneRepMaxes, onStartProgrammeDay }) {
  const C = useContext(ThemeContext);
  const [showProgrammeSetup, setShowProgrammeSetup] = useState(false);
  const totalVolume = workouts.reduce((s, w) => s + volumeOf(w, exercises, settings.bodyweight), 0);
  const lastWorkout = workouts[0];

  // Everything "this week" is measured from Monday 00:00 (calendar week), consistently
  const startOfWeek = startOfWeekMs();
  const thisWeekWorkouts = workouts.filter(w => new Date(w.startedAt).getTime() >= startOfWeek);
  const thisWeek = thisWeekWorkouts.length;

  const programmeBlock = activeProgramme ? LPP_PROGRAMME.blocks[activeProgramme.block] : null;
  const weekLabel = programmeBlock ? `Block ${activeProgramme.block + 1} · Week ${activeProgramme.week + 1}` : '';

  // Which programme days have been completed this calendar week (Mon reset)
  const completedDayIds = new Set(
    thisWeekWorkouts.filter(w => w.programmeDayId).map(w => w.programmeDayId)
  );

  // Weekly Load ring: sessions completed this week vs. days scheduled across active routines (Whoop-style strain ring)
  const scheduledDaysThisWeek = new Set();
  routines.forEach(r => (r.scheduledDays || []).forEach(d => scheduledDaysThisWeek.add(d)));
  if (programmeBlock) programmeBlock.days.forEach(d => scheduledDaysThisWeek.add(d.scheduledDay));
  const weeklyTarget = scheduledDaysThisWeek.size || 5;
  const loadPct = Math.round((thisWeek / weeklyTarget) * 100);
  // Compare sessions-done to days-elapsed-this-week (not the full week) so early-week is neutral, not "behind"
  const daysElapsed = getTodayIdx() + 1;
  const expectedByNow = Math.round((weeklyTarget * daysElapsed) / 7);
  const ringColor = thisWeek >= weeklyTarget ? C.strainLow
    : thisWeek >= expectedByNow ? C.accent
    : thisWeek >= Math.max(expectedByNow - 1, 0) ? C.strainMid
    : C.strainHigh;

  const todayIdx = getTodayIdx();
  const todaysRoutines = routines.filter(r => (r.scheduledDays || []).includes(todayIdx));
  const notifStatus = getNotificationStatus();
  const showNotifFallback = settings.notificationsEnabled && (notifStatus === 'denied' || notifStatus === 'unsupported');

  // ---- Extra metrics for the redesigned hero (all calendar-week based) ----
  const weekVolume = thisWeekWorkouts.reduce((s, w) => s + volumeOf(w, exercises, settings.bodyweight), 0);
  const weekVolumeT = weekVolume / 1000;
  const weekSets = thisWeekWorkouts.reduce((n, w) => n + w.exercises.reduce((m, ex) => m + ex.sets.filter(isStatSet).length, 0), 0);

  // Best-ever completed week's tonnage (excluding the current, in-progress week) — shown once there's history to compare against
  const volumeByWeek = {};
  workouts.forEach(w => {
    const wk = startOfWeekMs(new Date(w.startedAt));
    if (wk === startOfWeek) return; // skip the current week
    volumeByWeek[wk] = (volumeByWeek[wk] || 0) + volumeOf(w, exercises, settings.bodyweight);
  });
  const bestWeekVolume = Object.values(volumeByWeek).reduce((m, v) => Math.max(m, v), 0);
  const bestWeekVolumeT = bestWeekVolume / 1000;
  const volumeVsBest = bestWeekVolume > 0 ? Math.round(((weekVolume - bestWeekVolume) / bestWeekVolume) * 100) : null;
  const isRecordWeek = bestWeekVolume > 0 && weekVolume > bestWeekVolume;

  // Best squat PR (from programme's squat 1RM key -> Back Squat exercise)
  const bestSquat = bestPRFor(workouts, 'ex_bsquat');

  // Avg RIR over last 7 days
  const recentRIRs = [];
  thisWeekWorkouts.forEach(w => w.exercises.forEach(ex => ex.sets.forEach(s => { if (isStatSet(s) && s.rir != null) recentRIRs.push(s.rir); })));
  const avgRIR = recentRIRs.length ? (recentRIRs.reduce((a, b) => a + b, 0) / recentRIRs.length) : null;

  // Streak: consecutive days (working back from today) with at least one workout
  const workoutDays = new Set(workouts.map(w => new Date(w.startedAt).toDateString()));
  let streak = 0;
  for (let i = 0; i < 400; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    if (workoutDays.has(d.toDateString())) streak++;
    else if (i > 0) break; // today with no workout yet doesn't break a prior streak
  }

  const advanceWeek = () => {
    if (!activeProgramme) return;
    const block = LPP_PROGRAMME.blocks[activeProgramme.block];
    if (activeProgramme.week + 1 < block.weeks) {
      setActiveProgramme({ ...activeProgramme, week: activeProgramme.week + 1 });
    } else if (activeProgramme.block + 1 < LPP_PROGRAMME.blocks.length) {
      setActiveProgramme({ ...activeProgramme, block: activeProgramme.block + 1, week: 0 });
    }
  };
  const isProgrammeComplete = activeProgramme
    && activeProgramme.block === LPP_PROGRAMME.blocks.length - 1
    && activeProgramme.week === LPP_PROGRAMME.blocks[activeProgramme.block].weeks - 1;

  const isDark = C.pageBg === '#0C0E0B';

  return (
    <div className="px-4 pt-6 relative">
      {/* Signature aura glow (dark theme only) */}
      {isDark && (
        <div
          className="pointer-events-none fixed left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ width: 460, height: 460, filter: 'blur(60px)', opacity: 0.85 }}
        >
          <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle at 38% 34%, ${C.accentHover} 0%, transparent 42%), radial-gradient(circle at 66% 44%, ${C.warmRed} 0%, transparent 46%), radial-gradient(circle at 54% 70%, ${C.warmOrange} 0%, transparent 44%)` }} />
        </div>
      )}

      <div className="relative z-10">
        <header className="mb-5 flex items-start justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] mb-1.5" style={{ color: C.textMuted }}>
              {new Date().toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <h1 className="app-title" style={{ backgroundImage: `linear-gradient(135deg, ${C.accentHover} 0%, ${C.accent} 100%)` }}>Smacht</h1>
          </div>
          <button onClick={onOpenSettings} className="w-10 h-10 rounded-full grid place-items-center" style={{ background: C.cardSolid, border: `1px solid ${C.border}`, color: C.textMuted }}>
            <Settings size={18} />
          </button>
        </header>

        <div className="flex flex-col gap-3">

          {/* HERO — this week's tonnage, compared to your best week once there's history */}
          <MetricCard>
            <CardLabel dot={C.accent}>This Week's Tonnage {isRecordWeek && <span className="ml-1" style={{ color: C.accent }}>· RECORD</span>}</CardLabel>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="num font-extrabold leading-[0.9]" style={{ color: C.textPrimary, fontSize: 52, letterSpacing: '-0.035em' }}>{weekVolumeT.toFixed(1)}</span>
              <span className="font-semibold" style={{ color: C.textMuted, fontSize: 20 }}>t lifted</span>
              {volumeVsBest != null && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-0.5 ml-auto" style={{ background: C.accentTint, color: volumeVsBest >= 0 ? C.accent : C.warmRed }}>
                  {volumeVsBest >= 0 ? '↑' : '↓'} {Math.abs(volumeVsBest)}% vs best
                </span>
              )}
            </div>
            {bestWeekVolume > 0 ? (
              <>
                <div className="flex justify-between text-xs mt-4 mb-2" style={{ color: C.textMuted }}>
                  <span>{isRecordWeek ? 'New best week' : 'Best week'}: <b style={{ color: C.textPrimary }}>{bestWeekVolumeT.toFixed(1)}t</b></span>
                  {!isRecordWeek && <span><b style={{ color: C.textPrimary }}>{Math.max(0, (bestWeekVolumeT - weekVolumeT)).toFixed(1)}t</b> to beat it</span>}
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.round((weekVolume / bestWeekVolume) * 100))}%`, background: `linear-gradient(90deg, ${C.warmOrange}, ${C.accentHover})` }} />
                </div>
              </>
            ) : (
              <div className="text-xs mt-3" style={{ color: C.textMuted }}>Log a full week and your best week shows here to beat.</div>
            )}
          </MetricCard>

          {/* Weekly Load arc + two stat tiles */}
          <div className="grid grid-cols-2 gap-3">
            <MetricCard className="flex items-center justify-center">
              <RingGauge size={150} stroke={13} pct={loadPct} color={ringColor} value={thisWeek} unit={`/ ${weeklyTarget}`} label="Weekly Load" />
            </MetricCard>
            <div className="flex flex-col gap-3">
              <MetricTile dot={C.warmOrange} label="Working Sets" value={weekSets} unit="this wk" />
              <MetricTile dot={C.accent} label="Total Workouts" value={workouts.length} />
            </div>
          </div>

          {/* Notification fallback banner */}
          {showNotifFallback && (
            <div className="rounded-xl p-3 flex items-start gap-2 text-xs" style={{ background: '#2A2410', border: `1px solid ${C.warmOrange}55`, color: '#E8C87A' }}>
              <BellOff size={14} className="mt-0.5 shrink-0" />
              <div className="flex-1">
                {notifStatus === 'denied'
                  ? 'Notifications are blocked in your browser. Enable in site settings to get reminders.'
                  : "Your browser doesn't support notifications. Today's session shows here when you open the app."}
              </div>
            </div>
          )}

          {/* Programme — pick any session for this week */}
          {activeProgramme && (
            <MetricCard className="p-0 overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: C.textMuted }}>{LPP_PROGRAMME.name}</div>
                  <div className="text-base font-bold" style={{ color: C.textPrimary }}>{weekLabel} of 8</div>
                </div>
                {!isProgrammeComplete ? (
                  <button onClick={advanceWeek} className="px-3 py-2 rounded-xl font-bold uppercase text-[11px] tracking-wider" style={{ background: C.accentTint, color: C.accent }}>
                    Advance <ArrowRight size={11} className="inline ml-0.5" />
                  </button>
                ) : (
                  <span className="px-3 py-2 rounded-xl font-bold uppercase text-[11px] tracking-wider" style={{ background: C.accentTint, color: C.accent }}>Final Week</span>
                )}
              </div>
              {programmeBlock.days.map((day) => {
                const done = completedDayIds.has(day.id);
                return (
                  <div key={day.id} className="flex items-center gap-3 px-5 py-3" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div className="w-8 h-8 rounded-xl grid place-items-center shrink-0" style={{ background: done ? C.accent : C.accentTint, color: done ? '#10140C' : C.accent }}>
                      {done ? <Check size={15} strokeWidth={3} /> : <Dumbbell size={15} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-bold leading-tight" style={{ color: done ? C.textMuted : C.textPrimary }}>{day.name}</div>
                      <div className="text-[11px]" style={{ color: C.textFaint }}>{day.exercises.length} exercises{done ? ' · done this week' : ''}</div>
                    </div>
                    <button
                      onClick={() => onStartProgrammeDay(day, activeProgramme.week, weekLabel)}
                      className="px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0"
                      style={done
                        ? { background: 'transparent', border: `1px solid ${C.border}`, color: C.textSecondary }
                        : { background: C.accent, color: '#10140C' }}
                    >
                      <Play size={11} fill="currentColor" /> {done ? 'Again' : 'Start'}
                    </button>
                  </div>
                );
              })}
            </MetricCard>
          )}

          {/* Today's routine banner (non-programme) */}
          {todaysRoutines.length > 0 && (
            <MetricCard className="p-0 overflow-hidden">
              <div className="text-[10px] uppercase tracking-[0.16em] px-5 pt-4" style={{ color: C.textMuted }}>Today · {DAYS[todayIdx]}</div>
              {todaysRoutines.map((r, i) => (
                <div key={r.id} className="flex items-center justify-between px-5 py-3" style={i > 0 ? { borderTop: `1px solid ${C.border}` } : {}}>
                  <div>
                    <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{r.name}</div>
                    {r.note && <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{r.note}</div>}
                  </div>
                  <button onClick={() => onStartRoutine(r)} className="px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1.5" style={{ background: C.accent, color: '#10140C' }}>
                    <Play size={12} fill="currentColor" /> Start
                  </button>
                </div>
              ))}
            </MetricCard>
          )}

          {/* Primary CTA — when a programme is active, sessions start from the picker above,
              so the big CTA is empty-workout. Otherwise it's the main entry point. */}
          {activeProgramme ? (
            <button onClick={onStartEmpty} className="w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2" style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textSecondary }}>
              <Plus size={15} /> Start empty workout
            </button>
          ) : (
            <PrimaryCTA C={C} onClick={onStartEmpty} label="Start Empty Workout" />
          )}

          {/* PR + Avg RIR tiles */}
          <div className="grid grid-cols-2 gap-3">
            <MetricTile dot={C.accent} label="Best Squat" value={bestSquat.weight > 0 ? bestSquat.weight : '—'} unit={bestSquat.weight > 0 ? `kg × ${bestSquat.reps}` : ''} />
            <MetricTile dot={C.warmRed} label="Avg RIR" value={avgRIR != null ? avgRIR.toFixed(1) : '—'} unit={avgRIR != null ? 'last 7d' : ''} />
          </div>

          {/* Programme card + streak */}
          <div className="grid grid-cols-2 gap-3">
            {activeProgramme ? (
              <div className="relative rounded-3xl overflow-hidden min-h-[150px] flex items-end" style={{ border: `1px solid ${C.border}` }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(12,14,11,0) 30%, rgba(12,14,11,0.92) 100%), linear-gradient(120deg, #6b5533, #8a6a3d 40%, #3a4a2a)` }} />
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.5)', color: C.textPrimary }}>Programme</div>
                <div className="relative p-4">
                  <div className="text-lg font-extrabold leading-tight" style={{ color: '#fff', letterSpacing: '-0.02em' }}>Legs/Push/Pull</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>16 weeks · Advanced</div>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowProgrammeSetup(true)} className="relative rounded-3xl overflow-hidden min-h-[150px] flex flex-col items-start justify-end text-left p-4" style={{ border: `1px solid ${C.border}`, background: `linear-gradient(160deg, ${C.accentTint}, transparent), ${C.cardBg}` }}>
                <Zap size={18} style={{ color: C.accent }} />
                <div className="text-base font-extrabold mt-auto pt-2" style={{ color: C.textPrimary }}>Start a Programme</div>
                <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Nippard LPP · 16 weeks</div>
              </button>
            )}
            <div className="rounded-3xl flex flex-col items-center justify-center gap-3 py-6" style={{ background: `radial-gradient(circle at 50% 35%, ${C.accentGlow}, transparent 60%), ${C.cardBg}`, border: `1px solid ${C.border}` }}>
              <Flame size={40} style={{ color: C.accent, filter: `drop-shadow(0 0 10px ${C.accentGlow})` }} />
              <div className="num font-extrabold leading-none" style={{ color: C.textPrimary, fontSize: 38, letterSpacing: '-0.03em' }}>{streak}</div>
              <div className="text-xs uppercase tracking-[0.24em] font-bold" style={{ color: C.accent }}>Streak</div>
            </div>
          </div>

          {/* Secondary empty-workout link — only for the routine case (programme already shows one above) */}
          {!activeProgramme && todaysRoutines.length > 0 && (
            <button onClick={onStartEmpty} className="w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2" style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textSecondary }}>
              <Plus size={15} /> Start empty workout instead
            </button>
          )}

          {/* Your Routines */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: C.textMuted }}>Your Routines</h2>
              <button onClick={onCreateRoutine} className="text-[11px] uppercase tracking-wider font-bold flex items-center gap-1" style={{ color: C.accent }}>
                Manage <ArrowRight size={12} />
              </button>
            </div>
            {routines.length === 0 ? (
              <div className="rounded-3xl p-6 text-center" style={{ border: `1px dashed ${C.textFaint}` }}>
                <Dumbbell size={24} className="mx-auto mb-2" style={{ color: C.textFaint }} />
                <div className="text-sm mb-3" style={{ color: C.textSecondary }}>No routines yet</div>
                <button onClick={onCreateRoutine} className="text-xs uppercase tracking-wider font-bold" style={{ color: C.accent }}>
                  + Add or Import Routines
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {routines.map((r) => (
                  <MetricCard key={r.id} as="button" onClick={() => onStartRoutine(r)} className="w-full text-left flex items-center justify-between">
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
                  </MetricCard>
                ))}
              </div>
            )}
          </div>

          {/* Last Session */}
          {lastWorkout && (
            <div className="mt-4">
              <h2 className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: C.textMuted }}>Last Session</h2>
              <MetricCard>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{lastWorkout.name}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>{fmtDate(lastWorkout.startedAt)}</div>
                </div>
                <div className="flex gap-4 text-xs" style={{ color: C.textSecondary }}>
                  <span className="flex items-center gap-1"><Clock size={12} /> {fmtDuration(lastWorkout.duration)}</span>
                  <span className="flex items-center gap-1"><Dumbbell size={12} /> {lastWorkout.exercises.length} exercises</span>
                  <span className="flex items-center gap-1 num"><Flame size={12} /> {Math.round(volumeOf(lastWorkout, exercises, settings.bodyweight))} kg</span>
                </div>
              </MetricCard>
            </div>
          )}

        </div>
      </div>

      {showProgrammeSetup && (
        <ProgrammeSetupModal
          oneRepMaxes={oneRepMaxes}
          onStart={(orms) => {
            setOneRepMaxes(orms);
            setActiveProgramme({ programmeId: LPP_PROGRAMME.id, block: 0, week: 0 });
            setShowProgrammeSetup(false);
          }}
          onClose={() => setShowProgrammeSetup(false)}
        />
      )}
    </div>
  );
}

function ProgrammeSetupModal({ oneRepMaxes, onStart, onClose }) {
  const C = useContext(ThemeContext);
  const [orms, setOrms] = useState({
    squat: oneRepMaxes.squat || '', bench: oneRepMaxes.bench || '',
    deadlift: oneRepMaxes.deadlift || '', ohp: oneRepMaxes.ohp || '',
  });
  const LIFTS = [
    { key: 'squat', label: 'Back Squat' },
    { key: 'bench', label: 'Bench Press' },
    { key: 'deadlift', label: 'Deadlift' },
    { key: 'ohp', label: 'Overhead Press' },
  ];
  const canStart = LIFTS.every(l => parseFloat(orms[l.key]) > 0);

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold mb-1" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>Start Programme</h3>
        <p className="text-sm mb-5" style={{ color: C.textSecondary }}>Enter your current 1-rep max for each lift. The programme uses these to calculate weekly working weights (e.g. 75% of your squat 1RM).</p>
        <div className="space-y-3 mb-6">
          {LIFTS.map(l => (
            <div key={l.key}>
              <label className="text-[10px] uppercase tracking-wider mb-1 block" style={{ color: C.textMuted }}>{l.label} (kg)</label>
              <input
                type="number" inputMode="decimal" placeholder="0"
                value={orms[l.key]}
                onChange={(e) => setOrms({ ...orms, [l.key]: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl text-base mono"
                style={{ background: C.inputBg, color: C.textPrimary, border: `1px solid ${C.border}` }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => onStart({ squat: parseFloat(orms.squat), bench: parseFloat(orms.bench), deadlift: parseFloat(orms.deadlift), ohp: parseFloat(orms.ohp) })}
          disabled={!canStart}
          className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider disabled:opacity-40"
          style={{ background: C.accent, color: '#10140C' }}
        >
          Begin Week 1
        </button>
      </div>
    </Modal>
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
  const [showFinishWarning, setShowFinishWarning] = useState(false);
  const [plateCalcFor, setPlateCalcFor] = useState(null);
  const [supersetPicker, setSupersetPicker] = useState(null);
  const [swapIdx, setSwapIdx] = useState(null);
  const beepedRef = useRef(false);

  // Count completed sets, and sets that have data typed in but weren't checked off
  const completedCount = workout.exercises.reduce((n, ex) => n + ex.sets.filter(s => s.completed).length, 0);
  const filledUncheckedCount = workout.exercises.reduce((n, ex) => n + ex.sets.filter(s => !s.completed && (s.weight > 0 || s.reps > 0)).length, 0);

  // Marks every filled-but-unchecked set complete, then finishes (used by the warning dialog)
  const finishMarkingAll = () => {
    const next = { ...workout, exercises: workout.exercises.map(ex => ({
      ...ex, sets: ex.sets.map(s => (!s.completed && (s.weight > 0 || s.reps > 0)) ? { ...s, completed: true } : s),
    })) };
    setShowFinishWarning(false);
    onFinish(next); // pass the marked-up workout directly to avoid state-timing races
  };

  const handleFinishClick = () => {
    if (completedCount === 0) { setShowFinishWarning(true); return; }
    onFinish();
  };

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

  // Duplicate the set at setIdx, inserting the clone directly after it (weight/reps carried over)
  const duplicateSetAt = (exIdx, setIdx) => {
    const ex = workout.exercises[exIdx];
    const src = ex.sets[setIdx];
    const cloned = { type: src.type === 'warmup' ? 'working' : src.type, weight: src.weight || 0, reps: src.reps || 0, rir: null, completed: false };
    const sets = [...ex.sets];
    sets.splice(setIdx + 1, 0, cloned);
    const next = { ...workout };
    next.exercises = [...next.exercises];
    next.exercises[exIdx] = { ...next.exercises[exIdx], sets };
    setWorkout(next);
  };

  const removeExercise = (exIdx) => setWorkout({ ...workout, exercises: workout.exercises.filter((_, i) => i !== exIdx) });

  const swapExercise = (exIdx, newEx) => {
    const next = { ...workout };
    next.exercises = [...next.exercises];
    next.exercises[exIdx] = { ...next.exercises[exIdx], exerciseId: newEx.id, name: newEx.name };
    setWorkout(next);
    setSwapIdx(null);
  };

  const moveExercise = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= workout.exercises.length) return;
    const next = [...workout.exercises];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setWorkout({ ...workout, exercises: next });
  };

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
            <button onClick={handleFinishClick} className="font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5" style={{ background: C.accent, color: '#10140C' }}>
              <Square size={12} fill="currentColor" /> Finish
            </button>
          </div>
        </div>

        {restRemaining > 0 && (
          <div className="px-4 py-2 max-w-2xl mx-auto" style={{ background: C.accent, color: '#10140C' }}>
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
              exerciseDefs={exercises}
              onToggleSet={(setIdx) => toggleSetComplete(exIdx, setIdx)}
              onUpdateSet={(setIdx, patch) => updateSet(exIdx, setIdx, patch)}
              onChangeSetType={(setIdx, type) => changeSetType(exIdx, setIdx, type)}
              onAddSet={() => addSetTo(exIdx)}
              onRemoveSet={(setIdx) => removeSet(exIdx, setIdx)}
              onDuplicateSet={(setIdx) => duplicateSetAt(exIdx, setIdx)}
              onRemove={() => removeExercise(exIdx)}
              onSwap={() => setSwapIdx(exIdx)}
              onPlateCalc={(weight) => setPlateCalcFor({ exIdx, weight })}
              onSuperset={() => setSupersetPicker(exIdx)}
              onClearSuperset={() => clearSupersetGroup(exIdx)}
              onEditRest={(sec) => {
                const next = { ...workout };
                next.exercises = [...next.exercises];
                next.exercises[exIdx] = { ...next.exercises[exIdx], restSeconds: sec };
                setWorkout(next);
              }}
              onMoveUp={() => moveExercise(exIdx, exIdx - 1)}
              onMoveDown={() => moveExercise(exIdx, exIdx + 1)}
              canMoveUp={exIdx > 0}
              canMoveDown={exIdx < workout.exercises.length - 1}
              unit={settings.unit}
              bodyweight={settings.bodyweight}
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
      {swapIdx !== null && <ExercisePicker exercises={exercises} onPick={(ex) => swapExercise(swapIdx, ex)} onClose={() => setSwapIdx(null)} excludeIds={workout.exercises.filter((_, i) => i !== swapIdx).map((e) => e.exerciseId)} swapMode />}
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
      {showFinishWarning && (
        <Modal onClose={() => setShowFinishWarning(false)}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2" style={{ color: C.textPrimary }}>No sets marked done</h3>
            {filledUncheckedCount > 0 ? (
              <>
                <p className="text-sm mb-6" style={{ color: C.textSecondary }}>You have {filledUncheckedCount} set{filledUncheckedCount !== 1 ? 's' : ''} with weight and reps entered but not checked off. Log them so the workout saves and you get your Google Health prompt?</p>
                <div className="flex flex-col gap-2.5">
                  <button onClick={finishMarkingAll} className="w-full py-3 rounded-xl font-bold uppercase text-xs tracking-wider" style={{ background: C.accent, color: '#10140C' }}>Log all &amp; finish</button>
                  <button onClick={() => setShowFinishWarning(false)} className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Keep going</button>
                  <button onClick={() => { setShowFinishWarning(false); onCancel(); }} className="w-full py-2.5 rounded-xl font-semibold uppercase text-[11px] tracking-wider" style={{ color: '#DC2626' }}>Discard workout</button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm mb-6" style={{ color: C.textSecondary }}>This workout has no completed sets, so there's nothing to save. Keep going, or discard it?</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowFinishWarning(false)} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Keep going</button>
                  <button onClick={() => { setShowFinishWarning(false); onCancel(); }} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider text-white" style={{ background: '#DC2626' }}>Discard</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

function ExerciseBlock({
  exercise, exIdx, allExercises, workouts, exerciseDefs, onToggleSet, onUpdateSet, onChangeSetType,
  onAddSet, onRemoveSet, onDuplicateSet, onRemove, onSwap, onPlateCalc, onSuperset, onClearSuperset, onEditRest,
  onMoveUp, onMoveDown, canMoveUp, canMoveDown, unit, bodyweight,
}) {
  const C = useContext(ThemeContext);
  const [showTypeMenu, setShowTypeMenu] = useState(null);
  const [showRestEdit, setShowRestEdit] = useState(false);
  const [dismissedSuggestion, setDismissedSuggestion] = useState(false);

  const lastSets = findLastSetsFor(workouts, exercise.exerciseId);
  const isSuperset = !!exercise.supersetGroup;
  const supersetPartner = isSuperset
    ? allExercises.find((e, i) => i !== exIdx && e.supersetGroup === exercise.supersetGroup)
    : null;

  const historicalBest = bestPRFor(workouts, exercise.exerciseId).weight;
  const sessionBest = exercise.sets
    .filter(s => s.completed && s.type !== 'warmup' && s.type !== 'drop')
    .reduce((max, s) => Math.max(max, s.weight || 0), 0);
  const isPR = sessionBest > 0 && sessionBest > historicalBest;

  // No sets logged yet this session (weight/reps not typed in) means this is effectively "starting"
  // this exercise for today — that's when a stale suggestion is most useful, before you've overwritten it.
  const hasLoggedThisSession = exercise.sets.some(s => s.completed);
  const equipment = exerciseDefs?.find(e => e.id === exercise.exerciseId)?.equipment;
  const suggestion = (!hasLoggedThisSession && !dismissedSuggestion)
    ? suggestProgression(workouts, exercise.exerciseId, exercise.repRange, exercise.rirTarget, equipment)
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
            {isPR && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: C.accent, color: '#10140C' }}>
                PR
              </span>
            )}
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
          <div className="flex flex-col">
            <button onClick={onMoveUp} disabled={!canMoveUp} className="p-0.5 transition" style={{ color: canMoveUp ? C.textMuted : C.textFaint }}><ChevronUp size={13} /></button>
            <button onClick={onMoveDown} disabled={!canMoveDown} className="p-0.5 transition" style={{ color: canMoveDown ? C.textMuted : C.textFaint }}><ChevronDown size={13} /></button>
          </div>
          <button onClick={() => setShowRestEdit(true)} className="p-1 mono text-[10px] uppercase flex items-center gap-0.5" style={{ color: C.textMuted }}>
            <Timer size={12} />{fmtTime(exercise.restSeconds || 90)}
          </button>
          {isSuperset ? (
            <button onClick={onClearSuperset} className="p-1" style={{ color: C.superset }}><Link2 size={14} /></button>
          ) : (
            <button onClick={onSuperset} className="p-1" style={{ color: C.textMuted }}><Link2 size={14} /></button>
          )}
          <button onClick={onSwap} className="p-1" title="Swap exercise" style={{ color: C.textMuted }}><RefreshCw size={14} /></button>
          <button onClick={onRemove} className="p-1" style={{ color: C.textMuted }}><Trash2 size={14} /></button>
        </div>
      </div>

      {suggestion && (
        <div
          className="flex items-center justify-between gap-2 px-4 py-2 text-xs"
          style={{
            background: suggestion.type === 'progress' ? C.accentTint : '#3A1F1F',
            color: suggestion.type === 'progress' ? C.accent : '#F0A0A0',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {suggestion.type === 'progress' ? <TrendingUp size={13} className="shrink-0" /> : <Flame size={13} className="shrink-0" />}
            <span className="truncate">
              {suggestion.type === 'progress'
                ? <>Try <span className="mono font-bold">{suggestion.suggestedWeight} {unit}</span> — {suggestion.reason}</>
                : <>Hold or ease back — {suggestion.reason}</>}
            </span>
          </div>
          <button onClick={() => setDismissedSuggestion(true)} className="shrink-0 opacity-70"><X size={13} /></button>
        </div>
      )}

      {equipment === 'Bodyweight' && (
        <div className="flex items-center gap-1.5 px-4 py-2 text-[11px]" style={{ background: C.accentTint, borderBottom: `1px solid ${C.border}`, color: C.accent }}>
          <Dumbbell size={12} />
          <span>Bodyweight exercise — weight logged is <strong>added</strong> to your BW{bodyweight ? ` (${bodyweight} ${unit})` : ''}</span>
        </div>
      )}

      <div className="grid grid-cols-[1.75rem_1.25rem_1fr_1fr_2.25rem_2.25rem] gap-1.5 px-3 py-2 text-[10px] uppercase tracking-wider font-semibold" style={{ color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>
        <div>Set</div><div></div><div>{equipment === 'Bodyweight' ? `+${unit}` : unit}</div><div>Reps</div>
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
            onDuplicate={() => onDuplicateSet(i)}
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
                      ? { background: C.accent, color: '#10140C' }
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

const SWIPE_COMMIT_PX = 72;
const SWIPE_MAX_PX = 96;

function SetRow({ index, set, previous, onToggle, onUpdate, onChangeType, onRemove, onDuplicate, onShowTypeMenu, typeMenuOpen, onPlateCalc }) {
  const C = useContext(ThemeContext);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef(null); // { startX, startY, axis }

  // Track every pointer-down (including on inputs/buttons), but only hijack the
  // gesture once horizontal intent is confirmed past a deadzone — taps and
  // vertical scrolls fall through to native input/button behavior untouched.
  const onPointerDown = (e) => {
    dragState.current = { startX: e.clientX, startY: e.clientY, axis: null, pointerId: e.pointerId };
  };
  const onPointerMove = (e) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (!dragState.current.axis) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      dragState.current.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (dragState.current.axis === 'x') {
        setDragging(true);
        e.currentTarget.setPointerCapture?.(dragState.current.pointerId);
        e.target.blur?.();
      }
    }
    if (dragState.current.axis !== 'x') return;
    e.preventDefault();
    const clamped = Math.max(-SWIPE_MAX_PX, Math.min(SWIPE_MAX_PX, dx));
    setDragX(clamped);
  };
  const endDrag = () => {
    if (dragState.current?.axis === 'x') {
      if (dragX <= -SWIPE_COMMIT_PX) onRemove();
      else if (dragX >= SWIPE_COMMIT_PX) onDuplicate();
    }
    setDragX(0);
    setDragging(false);
    dragState.current = null;
  };

  const dark = C.pageBg === '#0C0E0B';
  // Subtle row tints when completed — theme-aware so dark mode doesn't flash bright pastels
  const rowBg = !set.completed ? 'transparent'
    : set.type === 'warmup' ? (dark ? 'rgba(234,179,8,0.12)' : '#FEF9C3')
    : set.type === 'failure' ? (dark ? 'rgba(220,38,38,0.14)' : '#FEE2E2')
    : set.type === 'drop' ? (dark ? 'rgba(147,51,234,0.16)' : '#F3E8FF')
    : C.accentTint; // working

  const badgeColor =
    set.type === 'warmup' ? (dark ? '#EAB308' : '#A16207')
    : set.type === 'failure' ? '#EF4444'
    : set.type === 'drop' ? (dark ? '#C084FC' : '#9333EA')
    : set.completed ? C.accent : C.textSecondary;

  const checkBg = !set.completed ? (dark ? 'rgba(255,255,255,0.09)' : '#E5E5E3')
    : set.type === 'warmup' ? '#EAB308'
    : set.type === 'failure' ? '#DC2626'
    : set.type === 'drop' ? '#9333EA'
    : C.accent;

  // Checkmark on a completed set: dark text on the bright lime accent, white on the colored types
  const checkColor = !set.completed ? C.textMuted
    : (set.type === 'working' || !set.type) ? '#10140C'
    : 'white';

  return (
    <div className="relative overflow-hidden">
      {/* Swipe reveal layer */}
      <div className="absolute inset-0 flex items-center justify-between px-4" style={{ background: dragX < 0 ? '#DC2626' : dragX > 0 ? C.accent : 'transparent' }}>
        <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#10140C', opacity: Math.min(1, dragX / SWIPE_COMMIT_PX) }}>
          <Plus size={14} /> Duplicate
        </div>
        <div className="flex items-center gap-1.5 text-white text-xs font-semibold ml-auto" style={{ opacity: Math.min(1, -dragX / SWIPE_COMMIT_PX) }}>
          Delete <Trash2 size={14} />
        </div>
      </div>

      <div
        className="relative grid grid-cols-[1.75rem_1.25rem_1fr_1fr_2.25rem_2.25rem] gap-1.5 px-3 py-2 items-center"
        style={{ background: rowBg, transform: `translateX(${dragX}px)`, transition: dragging ? 'none' : 'transform 0.2s ease' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
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

function ExercisePicker({ exercises, onPick, onClose, excludeIds = [], swapMode = false }) {
  const C = useContext(ThemeContext);
  const [q, setQ] = useState('');
  const [muscle, setMuscle] = useState('All');
  const filtered = exercises.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()) && (muscle === 'All' || e.muscle === muscle));

  return (
    <Modal onClose={onClose} fullscreen>
      <div className="flex items-center gap-3 p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
        <button onClick={onClose} style={{ color: C.textSecondary }}><ChevronLeft size={24} /></button>
        <h2 className="text-xl font-bold flex-1" style={{ color: C.textPrimary }}>{swapMode ? 'Swap Exercise' : 'Add Exercise'}</h2>
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
              style={muscle === m ? { background: C.accent, color: '#10140C' } : { background: C.inputBg, color: C.textSecondary, border: `1px solid ${C.border}` }}>
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
                ? <span className="text-[10px] uppercase tracking-wider" style={{ color: C.textMuted }}>{swapMode ? 'In use' : 'Added'}</span>
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
        onUpdate={(patch) => setWorkouts((prev) => prev.map((w) => w.id === selected.id ? { ...w, ...patch } : w))}
      />
    );
  }

  const grouped = groupByMonth(workouts);

  return (
    <div className="px-5 pt-8 relative">
      <ScreenAura />
      <div className="relative z-10">
      <TabTitle eyebrow="Every session">History</TabTitle>
      {workouts.length === 0 && (
        <div className="text-center py-16">
          <History size={32} className="mx-auto mb-3" style={{ color: C.textFaint }} />
          <div className="text-sm" style={{ color: C.textMuted }}>No workouts logged yet</div>
        </div>
      )}
      {Object.entries(grouped).map(([month, list]) => (
        <div key={month} className="mb-6">
          <div className="text-[11px] uppercase tracking-[0.22em] mb-2.5" style={{ color: C.textMuted }}>{month}</div>
          <div className="flex flex-col gap-2.5">
            {list.map((w) => (
              <MetricCard key={w.id} as="button" onClick={() => setSelectedId(w.id)} className="w-full text-left">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-lg font-bold" style={{ color: C.textPrimary }}>{w.name}</div>
                  <div className="text-xs" style={{ color: C.textMuted }}>{fmtDate(w.startedAt)}</div>
                </div>
                <div className="flex gap-4 text-xs" style={{ color: C.textSecondary }}>
                  <span className="flex items-center gap-1"><Clock size={12} /> {fmtDuration(w.duration)}</span>
                  <span className="flex items-center gap-1"><Dumbbell size={12} /> {w.exercises.length}</span>
                  <span className="flex items-center gap-1 num"><Flame size={12} /> {Math.round(volumeOf(w, exercises, settings?.bodyweight ?? 0))} kg</span>
                </div>
              </MetricCard>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

function GeminiCopyModal({ workout, exercises, onClose }) {
  const C = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const prompt = buildGeminiPrompt(workout, exercises);
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleShare = async () => {
    try {
      await navigator.share({ title: `Workout: ${workout.name}`, text: prompt });
      setShared(true);
      setTimeout(() => { setShared(false); onClose(); }, 1500);
    } catch {
      // user cancelled — do nothing
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-2xl font-extrabold" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>
            Log in Google Health
          </h3>
          <button onClick={onClose} style={{ color: C.textMuted }}><X size={20} /></button>
        </div>
        <p className="text-sm mb-4" style={{ color: C.textSecondary }}>
          {canShare
            ? 'Share directly to Google Health, or copy to paste manually into Gemini.'
            : 'Copy this and paste it into Google Health\'s Gemini agent.'}
        </p>

        <div className="rounded-xl p-3 mb-4 overflow-y-auto max-h-56 text-xs mono whitespace-pre-wrap"
          style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPrimary, lineHeight: 1.6 }}>
          {prompt}
        </div>

        <div className={canShare ? 'flex flex-col gap-2' : ''}>
          {canShare && (
            <button
              onClick={handleShare}
              className="w-full py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 text-white transition-all"
              style={{ background: shared ? '#16A34A' : C.accent }}>
              {shared ? <><CheckCheck size={16} /> Sent!</> : <><Share2 size={16} /> Share to Google Health</>}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="w-full py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all"
            style={canShare
              ? { background: C.inputBg, color: copied ? '#16A34A' : C.textPrimary, border: `1px solid ${C.border}` }
              : { background: copied ? '#16A34A' : C.accent, color: copied ? 'white' : '#10140C' }}>
            {copied ? <><CheckCheck size={16} /> Copied!</> : <><Copy size={16} /> Copy to Clipboard</>}
          </button>
        </div>

        {canShare && (
          <p className="text-[10px] text-center mt-3" style={{ color: C.textMuted }}>
            On iOS: tap Share → find Google Health in the sheet
          </p>
        )}
      </div>
    </Modal>
  );
}

function WorkoutDetail({ workout, exercises, onBack, onDelete, onUpdate }) {
  const C = useContext(ThemeContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [copiedInline, setCopiedInline] = useState(false);
  const [editDuration, setEditDuration] = useState(false);
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleInlineAction = async () => {
    const prompt = buildGeminiPrompt(workout, exercises);
    if (canShare) {
      try {
        await navigator.share({ title: `Workout: ${workout.name}`, text: prompt });
      } catch { /* cancelled */ }
    } else {
      navigator.clipboard.writeText(prompt).then(() => {
        setCopiedInline(true);
        setTimeout(() => setCopiedInline(false), 2500);
      });
    }
  };
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
        <button onClick={() => onUpdate && setEditDuration(true)} className="text-left relative rounded-2xl" style={onUpdate ? { outline: 'none' } : {}}>
          <StatCard label="Duration" value={fmtDuration(workout.duration)} unit="time" />
          {onUpdate && <Edit3 size={11} className="absolute top-2.5 right-2.5" style={{ color: C.textMuted }} />}
        </button>
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

      <button
        onClick={handleInlineAction}
        className="mt-5 w-full py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 text-white transition-all"
        style={{ background: copiedInline ? '#16A34A' : C.accent }}>
        {copiedInline
          ? <><CheckCheck size={16} /> Copied!</>
          : canShare
            ? <><Share2 size={16} /> Share to Google Health</>
            : <><Copy size={16} /> Copy for Google Health</>}
      </button>

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

      {showGemini && <GeminiCopyModal workout={workout} exercises={exercises} onClose={() => setShowGemini(false)} />}

      {editDuration && (
        <DurationEditModal
          duration={workout.duration}
          onSave={(seconds) => { onUpdate({ duration: seconds }); setEditDuration(false); }}
          onClose={() => setEditDuration(false)}
        />
      )}
    </div>
  );
}

function DurationEditModal({ duration, onSave, onClose }) {
  const C = useContext(ThemeContext);
  const [h, setH] = useState(Math.floor((duration || 0) / 3600));
  const [m, setM] = useState(Math.floor(((duration || 0) % 3600) / 60));

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold mb-1" style={{ color: C.textPrimary, letterSpacing: '-0.02em' }}>Edit duration</h3>
        <p className="text-sm mb-5" style={{ color: C.textSecondary }}>Adjust the length of this session — useful if you forgot to hit Finish at the end.</p>
        <div className="flex items-end gap-3 mb-6">
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider mb-1 block" style={{ color: C.textMuted }}>Hours</label>
            <input type="number" inputMode="numeric" min="0" max="12" value={h}
              onChange={(e) => setH(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2.5 rounded-xl text-lg mono text-center"
              style={{ background: C.inputBg, color: C.textPrimary, border: `1px solid ${C.border}` }} />
          </div>
          <div className="text-2xl font-bold pb-2.5" style={{ color: C.textMuted }}>:</div>
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider mb-1 block" style={{ color: C.textMuted }}>Minutes</label>
            <input type="number" inputMode="numeric" min="0" max="59" value={m}
              onChange={(e) => setM(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full px-3 py-2.5 rounded-xl text-lg mono text-center"
              style={{ background: C.inputBg, color: C.textPrimary, border: `1px solid ${C.border}` }} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.inputBg, color: C.textPrimary }}>Cancel</button>
          <button onClick={() => onSave(h * 3600 + m * 60)} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.accent, color: '#10140C' }}>Save</button>
        </div>
      </div>
    </Modal>
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
    <div className="px-5 pt-8 relative">
      <ScreenAura />
      <div className="relative z-10">
      <TabTitle eyebrow="Exercise database" action={(
        <button onClick={() => setShowAdd(true)} className="px-3 py-2 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-1" style={{ background: C.accent, color: '#10140C' }}>
          <Plus size={14} /> New
        </button>
      )}>Library</TabTitle>
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
            style={muscle === m ? { background: C.accent, color: '#10140C' } : { background: C.cardBg, color: C.textSecondary, border: `1px solid ${C.border}` }}>
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
            className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider disabled:opacity-40" style={{ background: C.accent, color: '#10140C' }}>Save</button>
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
    <div className="px-5 pt-8 relative">
      <ScreenAura />
      <div className="relative z-10">
      <TabTitle eyebrow="Your trends">Progress</TabTitle>

      {workouts.length >= 2 && (
        <MetricCard className="mb-6">
          <CardLabel dot={C.accent}>Weekly Volume</CardLabel>
          <div style={{ width: '100%', height: 160 }}>
            <ResponsiveContainer>
              <BarChart data={weeklyVolume} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="week" stroke={C.textMuted} fontSize={10} />
                <YAxis stroke={C.textMuted} fontSize={10} />
                <Tooltip contentStyle={{ background: C.cardSolid, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: C.textSecondary }} />
                <Bar dataKey="volume" fill={C.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </MetricCard>
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

  const hasBlock1 = routines.some(r => r.id.startsWith('nip_') && !r.id.startsWith('nip_b2_') && !r.id.startsWith('nip_lpp') && !r.id.startsWith('nip_ppl'));
  const hasBlock2 = routines.some(r => r.id.startsWith('nip_b2_'));

  const importNippardBlock = (block) => {
    const prefix = block === 1 ? (id) => id.startsWith('nip_') && !id.startsWith('nip_b2_') && !id.startsWith('nip_lpp') && !id.startsWith('nip_ppl')
                               : (id) => id.startsWith('nip_b2_');
    const existing = new Set(routines.map(r => r.id));
    const newOnes = NIPPARD_ROUTINES.filter(r => prefix(r.id) && !existing.has(r.id));
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

  return (
    <div className="px-5 pt-8 relative">
      <ScreenAura />
      <div className="relative z-10">
      <TabTitle eyebrow="Your training" action={(
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImport(true)} className="px-3 py-2 rounded-xl font-semibold uppercase text-xs tracking-wider flex items-center gap-1"
            style={{ background: C.cardBg, border: `1px solid ${C.border}`, color: C.textSecondary }}>
            <Upload size={12} /> Import
          </button>
          <button onClick={() => setEditing('new')} className="px-3 py-2 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-1" style={{ background: C.accent, color: '#10140C' }}>
            <Plus size={14} /> New
          </button>
        </div>
      )}>Routines</TabTitle>

      {(!hasBlock1 || !hasBlock2) && (
        <MetricCard className="mb-6" style={{ background: `linear-gradient(to bottom right, ${C.accentTint}, ${C.cardBg})` }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} style={{ color: C.accent }} />
            <div className="text-base font-bold" style={{ color: C.textPrimary }}>Nippard Min-Max</div>
          </div>
          <div className="text-xs mb-3" style={{ color: C.textSecondary }}>5-day Upper/Lower/Arms split, Mon/Tue/Thu/Fri/Sat, with warm-ups, RIR targets, and coaching notes.</div>
          <div className="flex gap-2">
            {!hasBlock1 && (
              <button onClick={() => importNippardBlock(1)} className="px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wider" style={{ background: C.accent, color: '#10140C' }}>
                Import Block 1
              </button>
            )}
            {!hasBlock2 && (
              <button onClick={() => importNippardBlock(2)} className="px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wider" style={{ background: hasBlock1 ? C.accent : C.inputBg, color: hasBlock1 ? '#10140C' : C.textPrimary, border: hasBlock1 ? 'none' : `1px solid ${C.border}` }}>
                Import Block 2
              </button>
            )}
          </div>
        </MetricCard>
      )}

      {routines.length === 0 ? (
        <div className="text-center py-8">
          <Dumbbell size={32} className="mx-auto mb-3" style={{ color: C.textFaint }} />
          <div className="text-sm mb-4" style={{ color: C.textMuted }}>Build a routine, import one, or load the Nippard program above.</div>
          <button onClick={() => setEditing('new')} className="px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wider" style={{ background: C.accent, color: '#10140C' }}>Create First Routine</button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {routines.map((r) => (
            <MetricCard key={r.id}>
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
              <button onClick={() => onStart(r)} className="w-full py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2" style={{ background: C.accent, color: '#10140C' }}>
                <Play size={12} fill="currentColor" /> Start
              </button>
            </MetricCard>
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
          <button onClick={handleImport} disabled={!json.trim()} className="flex-1 py-3 rounded-xl font-semibold uppercase text-xs tracking-wider disabled:opacity-40" style={{ background: C.accent, color: '#10140C' }}>Import</button>
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
                    ? { background: C.accent, color: '#10140C' }
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
            className="w-full py-4 rounded-2xl font-bold uppercase text-sm tracking-wider disabled:opacity-40"
            style={{ background: C.accent, color: '#10140C' }}
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

        <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold uppercase text-xs tracking-wider" style={{ background: C.accent, color: '#10140C' }}>Done</button>
      </div>
    </Modal>
  );
}
