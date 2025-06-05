import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import StreakCounter from '@/components/StreakCounter';
import SessionCard, { Session } from '@/components/SessionCard';
import UpgradeCard from '@/components/UpgradeCard';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Mock data for demo purposes
  const [streakData] = useState({
    currentStreak: 5,
    longestStreak: 12,
    totalSessions: 24,
    totalMinutes: 720,
  });
  
  const [sessions] = useState<Session[]>([
    {
      id: '1',
      duration: 30,
      participantCount: 3,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      completed: false,
    },
    {
      id: '2',
      duration: 60,
      participantCount: 2,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      completed: true,
    },
    {
      id: '3',
      duration: 15,
      participantCount: 4,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      completed: true,
    },
  ]);
  
  const handleSessionPress = (session: Session) => {
    console.log('Session pressed:', session);
    // Navigate to session details
  };
  
  const handleUpgradePress = () => {
    console.log('Upgrade pressed');
    // Navigate to upgrade page
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.name || 'User'}</Text>
      </View>
      
      <StreakCounter
        currentStreak={streakData.currentStreak}
        longestStreak={streakData.longestStreak}
        totalSessions={streakData.totalSessions}
        totalMinutes={streakData.totalMinutes}
      />
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
        {sessions
          .filter(session => !session.completed)
          .map(session => (
            <SessionCard
              key={session.id}
              session={session}
              onPress={handleSessionPress}
            />
          ))}
        {sessions.filter(session => !session.completed).length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No upcoming sessions</Text>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={() => console.log('Create new session')}
            >
              <Text style={styles.createButtonText}>Create New Session</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <UpgradeCard onPress={handleUpgradePress} />
      
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {sessions
          .filter(session => session.completed)
          .map(session => (
            <SessionCard
              key={session.id}
              session={session}
              onPress={handleSessionPress}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  contentContainer: {
    padding: 16,
  },
  welcomeContainer: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#718096',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    color: '#1A202C',
    fontFamily: 'Inter-Bold',
  },
  sectionContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2D3748',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#5D3FD3',
    fontFamily: 'Inter-Medium',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#718096',
    fontFamily: 'Inter-Medium',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#5D3FD3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});