import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AchievementCard, { Achievement } from '@/components/AchievementCard';

export default function Achievements() {
  // Mock data for demo purposes
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Connection',
      description: 'Connect with your first friend',
      completed: true,
    },
    {
      id: '2',
      title: 'Social Butterfly',
      description: 'Connect with 10 friends',
      completed: false,
      progress: 40,
    },
    {
      id: '3',
      title: 'Digital Detox',
      description: 'Complete 5 sessions in a week',
      completed: true,
    },
    {
      id: '4',
      title: 'Consistent Connector',
      description: 'Maintain a 7-day streak',
      completed: false,
      progress: 70,
    },
    {
      id: '5',
      title: 'Marathon Session',
      description: 'Complete a 60-minute session',
      completed: true,
    },
    {
      id: '6',
      title: 'Group Connection',
      description: 'Complete a session with 3+ people',
      completed: false,
      progress: 0,
    },
    {
      id: '7',
      title: 'Milestone: 10 Hours',
      description: 'Spend 10 hours in offline mode',
      completed: false,
      progress: 85,
    },
  ]);
  
  const completedAchievements = achievements.filter(a => a.completed);
  const inProgressAchievements = achievements.filter(a => !a.completed);
  
  const [activeTab, setActiveTab] = useState('all');
  
  const handleAchievementPress = (achievement: Achievement) => {
    console.log('Achievement pressed:', achievement);
    // Show achievement details
  };
  
  const renderAchievements = () => {
    let filteredAchievements = achievements;
    
    if (activeTab === 'completed') {
      filteredAchievements = completedAchievements;
    } else if (activeTab === 'in-progress') {
      filteredAchievements = inProgressAchievements;
    }
    
    return filteredAchievements.map(achievement => (
      <AchievementCard
        key={achievement.id}
        achievement={achievement}
        onPress={handleAchievementPress}
      />
    ));
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedAchievements.length}</Text>
            <Text style={styles.statLabel}>Unlocked</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{inProgressAchievements.length}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{achievements.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'in-progress' && styles.activeTab]}
          onPress={() => setActiveTab('in-progress')}
        >
          <Text style={[styles.tabText, activeTab === 'in-progress' && styles.activeTabText]}>
            In Progress
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.achievementsContainer}>
        {renderAchievements()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#5D3FD3',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#F3F0FF',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  activeTabText: {
    color: '#5D3FD3',
  },
  scrollContainer: {
    flex: 1,
  },
  achievementsContainer: {
    padding: 16,
  },
});