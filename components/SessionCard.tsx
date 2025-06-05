import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Users } from 'lucide-react-native';

export interface Session {
  id: string;
  duration: number; // in minutes
  participantCount: number;
  date: Date;
  completed: boolean;
}

interface SessionCardProps {
  session: Session;
  onPress: (session: Session) => void;
}

export default function SessionCard({ session, onPress }: SessionCardProps) {
  const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const formattedTime = new Date(session.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <TouchableOpacity 
      style={[styles.container, session.completed ? styles.completedSession : styles.upcomingSession]} 
      onPress={() => onPress(session)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {session.completed ? 'Completed Session' : 'Upcoming Session'}
        </Text>
        <View style={[styles.badge, session.completed ? styles.completedBadge : styles.upcomingBadge]}>
          <Text style={styles.badgeText}>
            {session.completed ? 'COMPLETED' : 'UPCOMING'}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Clock size={16} color="#5D3FD3" />
          <Text style={styles.infoText}>{session.duration} min</Text>
        </View>
        <View style={styles.infoItem}>
          <Users size={16} color="#5D3FD3" />
          <Text style={styles.infoText}>{session.participantCount} participants</Text>
        </View>
      </View>
      
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTime}>{formattedDate} at {formattedTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedSession: {
    backgroundColor: '#F3F0FF',
    borderLeftWidth: 4,
    borderLeftColor: '#5D3FD3',
  },
  upcomingSession: {
    backgroundColor: '#EBF8FF',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedBadge: {
    backgroundColor: '#5D3FD3',
  },
  upcomingBadge: {
    backgroundColor: '#4A90E2',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4A5568',
  },
  dateTimeContainer: {
    marginTop: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#718096',
  },
});