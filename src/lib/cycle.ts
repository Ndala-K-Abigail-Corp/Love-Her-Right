import { differenceInDays, parseISO } from 'date-fns';
import { CycleInfo } from '../types';

export function calculateCycleInfo(
  cycleStartDate: string,
  cycleLength: number = 28
): CycleInfo {
  const startDate = parseISO(cycleStartDate);
  const today = new Date();
  const daysSinceStart = differenceInDays(today, startDate);
  const currentDay = (daysSinceStart % cycleLength) + 1;
  const daysUntilNext = cycleLength - currentDay + 1;

  // Determine phase based on typical cycle
  let phase: CycleInfo['phase'];
  let mood: string;
  let tips: string[];

  if (currentDay >= 1 && currentDay <= 5) {
    phase = 'menstrual';
    mood = 'She may be experiencing cramps and fatigue';
    tips = [
      'Offer a heating pad or warm compress',
      'Prepare her favorite comfort food',
      'Give her space if needed, but check in regularly',
      'Handle household chores without being asked',
    ];
  } else if (currentDay >= 6 && currentDay <= 13) {
    phase = 'follicular';
    mood = 'Energy levels are rising, feeling more positive';
    tips = [
      'Great time to plan fun activities together',
      'She may be more social and outgoing',
      'Support her new ideas and projects',
      'Plan a date night or adventure',
    ];
  } else if (currentDay >= 14 && currentDay <= 16) {
    phase = 'ovulation';
    mood = 'Peak energy and confidence';
    tips = [
      'She may feel more attractive and confident',
      'Great time for deep conversations',
      'Plan something special or romantic',
      'Be attentive and appreciative',
    ];
  } else {
    phase = 'luteal';
    mood = 'Energy may be declining, possible PMS symptoms';
    tips = [
      'Be patient and understanding',
      'Stock up on her favorite snacks',
      'Offer relaxation activities like a massage',
      'Be extra thoughtful and avoid conflicts',
    ];
  }

  return {
    currentDay,
    phase,
    daysUntilNext,
    mood,
    tips,
  };
}

export function getCyclePhaseColor(phase: CycleInfo['phase']): string {
  switch (phase) {
    case 'menstrual':
      return 'bg-red-100 text-red-800';
    case 'follicular':
      return 'bg-green-100 text-green-800';
    case 'ovulation':
      return 'bg-pink-100 text-pink-800';
    case 'luteal':
      return 'bg-yellow-100 text-yellow-800';
  }
}
