import { CycleInfo } from '../types';

export const CYCLE_PHASES = {
  MENSTRUAL: 'Menstrual',
  FOLLICULAR: 'Follicular',
  OVULATION: 'Ovulation',
  LUTEAL: 'Luteal',
  PMS: 'PMS',
  UNKNOWN: 'Unknown',
} as const;

export type CyclePhase = typeof CYCLE_PHASES[keyof typeof CYCLE_PHASES];

export function calculateCyclePhase(cycleInfo: CycleInfo, targetDate: Date = new Date()): { phase: CyclePhase; day: number } {
  const { lastPeriodStart, cycleLength, periodLength } = cycleInfo;
  
  const diffTime = Math.abs(targetDate.getTime() - lastPeriodStart.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Normalize day to current cycle
  const currentDay = (diffDays % cycleLength) || cycleLength; // 1-based index

  let phase: CyclePhase = CYCLE_PHASES.UNKNOWN;

  if (currentDay <= periodLength) {
    phase = CYCLE_PHASES.MENSTRUAL;
  } else if (currentDay < cycleLength - 14) {
    phase = CYCLE_PHASES.FOLLICULAR;
  } else if (currentDay === cycleLength - 14) {
    phase = CYCLE_PHASES.OVULATION;
  } else if (currentDay > cycleLength - 14 && currentDay <= cycleLength - 3) {
    phase = CYCLE_PHASES.LUTEAL;
  } else {
    phase = CYCLE_PHASES.PMS;
  }

  return { phase, day: currentDay };
}

export function getNextPeriodDate(cycleInfo: CycleInfo): Date {
  const { lastPeriodStart, cycleLength } = cycleInfo;
  const nextDate = new Date(lastPeriodStart);
  nextDate.setDate(lastPeriodStart.getDate() + cycleLength);
  return nextDate;
}
