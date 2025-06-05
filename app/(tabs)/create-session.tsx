import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Clock, UserPlus, ChevronRight, Lock } from 'lucide-react-native';
import AppButton from '@/components/AppButton';

const DURATIONS = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '60 minutes' },
  { value: 'custom', label: 'Custom Duration', premium: true },
];

export default function CreateSession() {
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  
  // Mock data for demo purposes
  const friends = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Chen' },
    { id: '3', name: 'Aisha Patel' },
  ];
  
  const handleDurationSelect = (duration: number | 'custom') => {
    if (duration === 'custom') {
      // Show premium upgrade modal in a real app
      alert('Upgrade to premium to access custom durations');
      return;
    }
    
    setSelectedDuration(duration as number);
  };
  
  const toggleFriendSelection = (friendId: string) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };
  
  const handleStartSession = () => {
    // In a real app, you would create the session on the server
    
    // Navigate to session screen
    router.push({
      pathname: '/session',
      params: {
        duration: selectedDuration,
        participants: selectedFriends.length,
      },
    });
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Select Duration</Text>
      <View style={styles.durationContainer}>
        {DURATIONS.map((duration) => (
          <TouchableOpacity
            key={duration.value.toString()}
            style={[
              styles.durationOption,
              selectedDuration === duration.value && styles.selectedDuration,
              duration.premium && styles.premiumOption,
            ]}
            onPress={() => handleDurationSelect(duration.value)}
            activeOpacity={0.7}
          >
            <View style={styles.durationIconContainer}>
              <Clock 
                size={24} 
                color={
                  selectedDuration === duration.value 
                    ? '#FFFFFF' 
                    : duration.premium ? '#F9A826' : '#5D3FD3'
                } 
              />
            </View>
            <View style={styles.durationContent}>
              <Text 
                style={[
                  styles.durationLabel,
                  selectedDuration === duration.value && styles.selectedDurationLabel,
                ]}
              >
                {duration.label}
              </Text>
              
              {duration.premium && (
                <View style={styles.premiumBadge}>
                  <Lock size={12} color="#FFFFFF" />
                  <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Invite Friends</Text>
        <TouchableOpacity style={styles.inviteButton}>
          <UserPlus size={16} color="#5D3FD3" />
          <Text style={styles.inviteButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.friendsContainer}>
        {friends.map((friend) => (
          <TouchableOpacity
            key={friend.id}
            style={[
              styles.friendOption,
              selectedFriends.includes(friend.id) && styles.selectedFriend,
            ]}
            onPress={() => toggleFriendSelection(friend.id)}
            activeOpacity={0.7}
          >
            <Text 
              style={[
                styles.friendName,
                selectedFriends.includes(friend.id) && styles.selectedFriendName,
              ]}
            >
              {friend.name}
            </Text>
            
            {selectedFriends.includes(friend.id) && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.viewAllFriends}>
          <Text style={styles.viewAllText}>View All Friends</Text>
          <ChevronRight size={16} color="#5D3FD3" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Session Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Duration:</Text>
          <Text style={styles.summaryValue}>{selectedDuration} minutes</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Participants:</Text>
          <Text style={styles.summaryValue}>
            {selectedFriends.length + 1} {/* +1 for the user */}
          </Text>
        </View>
      </View>
      
      <AppButton
        title="Start Session"
        onPress={handleStartSession}
        size="large"
        disabled={selectedDuration === 0}
        style={styles.startButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2D3748',
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  durationContainer: {
    marginBottom: 24,
  },
  durationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedDuration: {
    backgroundColor: '#5D3FD3',
    borderColor: '#5D3FD3',
  },
  premiumOption: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FCEFC7',
  },
  durationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  durationContent: {
    flex: 1,
  },
  durationLabel: {
    fontSize: 16,
    color: '#1A202C',
    fontFamily: 'Inter-Medium',
  },
  selectedDurationLabel: {
    color: '#FFFFFF',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9A826',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#5D3FD3',
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  friendsContainer: {
    marginBottom: 24,
  },
  friendOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedFriend: {
    backgroundColor: '#F3F0FF',
    borderColor: '#E9D8FD',
  },
  friendName: {
    fontSize: 16,
    color: '#1A202C',
    fontFamily: 'Inter-Medium',
  },
  selectedFriendName: {
    color: '#5D3FD3',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5D3FD3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewAllFriends: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  viewAllText: {
    color: '#5D3FD3',
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryTitle: {
    fontSize: 16,
    color: '#2D3748',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#718096',
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1A202C',
    fontFamily: 'Inter-Medium',
  },
  startButton: {
    marginBottom: 32,
  },
});