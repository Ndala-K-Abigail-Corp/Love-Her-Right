export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface UserProfile {
  name: string;
  partnerName: string;
  loveLanguage: 'words' | 'acts' | 'gifts' | 'time' | 'touch';
  cycleStartDate: string; // ISO date string
  cycleLength: number; // days
  notificationsEnabled: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  message: string;
  schedule: 'daily' | 'weekly' | 'monthly';
  time: string; // HH:mm format
  nextRun: string; // ISO date string
  enabled: boolean;
  createdAt: string;
}

export interface Favorite {
  id: string;
  item: string;
  category: 'food' | 'gift' | 'place' | 'activity' | 'other';
  notes: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
}

export interface SpecialDate {
  id: string;
  label: string;
  date: string; // ISO date string
  type: 'anniversary' | 'birthday' | 'custom';
  recurring: boolean;
}

export interface RelationshipTip {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface CycleInfo {
  currentDay: number;
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  daysUntilNext: number;
  mood: string;
  tips: string[];
}
