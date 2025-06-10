import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircularProgress from './CircularProgress';
import { Siren as Fire } from 'lucide-react-native';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalMinutes: number;
}

export default function StreakCounter({
  currentStreak,
  longestStreak,
  totalSessions,
  totalMinutes,
}: StreakCounterProps) {
  // Calculate percentage of current streak compared to longest streak
  const streakPercentage = longestStreak > 0 
    ? Math.min(100, (currentStreak / longestStreak) * 100) 
    : 0;
  
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <CircularProgress
          size={160}
          width={12}
          fill={streakPercentage}
          tintColor="#F9A826"
          backgroundColor="#E2E8F0"
        >
          {() => (
            <View style={styles.streakContent}>
              <Fire size={24} color="#F9A826" />
              <Text style={styles.streakNumber}>{currentStreak}</Text>
              <Text style={styles.streakLabel}>day streak</Text>
            </View>
          )}
        </CircularProgress>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{longestStreak}</Text>
          <Text style={styles.statLabel}>Longest Streak</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalMinutes}</Text>
          <Text style={styles.statLabel}>Minutes Offline</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  circleContainer: {
    marginVertical: 16,
  },
  streakContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A202C',
    marginTop: 4,
  },
  streakLabel: {
    fontSize: 14,
    color: '#718096',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
});