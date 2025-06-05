import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import SessionTimer from '@/components/SessionTimer';

export default function SessionScreen() {
  const { duration, participants } = useLocalSearchParams<{ 
    duration: string;
    participants: string;
  }>();
  
  const parsedDuration = parseInt(duration || '30', 10);
  const parsedParticipants = parseInt(participants || '1', 10);
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleSessionComplete = () => {
    setIsCompleted(true);
    
    // Navigate to success screen
    router.replace({
      pathname: '/session-complete',
      params: {
        duration: parsedDuration,
        participants: parsedParticipants,
      },
    });
  };
  
  const handleSessionCancel = () => {
    Alert.alert(
      'Cancel Session',
      'Are you sure you want to end this session early? Your streak will not be counted.',
      [
        {
          text: 'No, Continue',
          style: 'cancel',
        },
        {
          text: 'Yes, End Session',
          onPress: () => router.back(),
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <SessionTimer
        duration={parsedDuration}
        onComplete={handleSessionComplete}
        onCancel={handleSessionCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});