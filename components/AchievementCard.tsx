import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Award } from 'lucide-react-native';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress?: number; // 0-100
  icon?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  onPress: (achievement: Achievement) => void;
}

export default function AchievementCard({ 
  achievement, 
  onPress 
}: AchievementCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        achievement.completed ? styles.completedAchievement : styles.incompleteAchievement
      ]} 
      onPress={() => onPress(achievement)}
      activeOpacity={0.7}
    >
      <View style={[
        styles.iconContainer, 
        achievement.completed ? styles.completedIcon : styles.incompleteIcon
      ]}>
        <Award 
          size={24} 
          color={achievement.completed ? '#F9A826' : '#A0AEC0'} 
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[
          styles.title,
          achievement.completed ? styles.completedTitle : styles.incompleteTitle
        ]}>
          {achievement.title}
        </Text>
        <Text style={styles.description}>{achievement.description}</Text>
        
        {achievement.progress !== undefined && !achievement.completed && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${achievement.progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{achievement.progress}%</Text>
          </View>
        )}
        
        {achievement.completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>COMPLETED</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedAchievement: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FCEFC7',
  },
  incompleteAchievement: {
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedIcon: {
    backgroundColor: '#FEFCF3',
    borderWidth: 1,
    borderColor: '#FCEFC7',
  },
  incompleteIcon: {
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  completedTitle: {
    color: '#1A202C',
  },
  incompleteTitle: {
    color: '#4A5568',
  },
  description: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#718096',
  },
  completedBadge: {
    backgroundColor: '#F9A826',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});