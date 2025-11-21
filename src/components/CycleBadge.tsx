import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CycleBadgeProps {
  phase: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal' | 'PMS' | 'Unknown';
  day?: number; // Day of the cycle
}

export const CycleBadge: React.FC<CycleBadgeProps> = ({ phase, day }) => {
  const getPhaseColor = () => {
    switch (phase) {
      case 'Menstrual': return '#FF6B6B'; // Red
      case 'Follicular': return '#4ECDC4'; // Teal
      case 'Ovulation': return '#FFE66D'; // Yellow
      case 'Luteal': return '#95E1D3'; // Light Teal
      case 'PMS': return '#F7D794'; // Orange-ish
      default: return '#E0E0E0';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getPhaseColor() }]}>
      <Text style={styles.text}>
        {phase} {day ? `• Day ${day}` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#333',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
