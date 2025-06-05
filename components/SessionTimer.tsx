import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Play, Pause, CircleStop as StopCircle } from 'lucide-react-native';

interface SessionTimerProps {
  duration: number; // in minutes
  onComplete: () => void;
  onCancel: () => void;
}

export default function SessionTimer({ 
  duration, 
  onComplete, 
  onCancel 
}: SessionTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0 && !isCompleted) {
      setIsCompleted(true);
      onComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, isCompleted, onComplete]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const progress = ((duration * 60 - secondsLeft) / (duration * 60)) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <AnimatedCircularProgress
          size={240}
          width={16}
          fill={progress}
          tintColor="#5D3FD3"
          backgroundColor="#E2E8F0"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.timerContent}>
              <Text style={styles.timeText}>{formatTime(secondsLeft)}</Text>
              <Text style={styles.minutesText}>
                {isActive ? 'Time remaining' : 'Paused'}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, styles.cancelButton]} 
          onPress={onCancel}
        >
          <StopCircle size={24} color="#E53E3E" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.playPauseButton]} 
          onPress={toggleTimer}
        >
          {isActive ? (
            <>
              <Pause size={24} color="#FFFFFF" />
              <Text style={styles.playPauseText}>Pause</Text>
            </>
          ) : (
            <>
              <Play size={24} color="#FFFFFF" />
              <Text style={styles.playPauseText}>Resume</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Stay present with your loved ones! Your device is locked for this session.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  timerContainer: {
    marginBottom: 40,
  },
  timerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  minutesText: {
    fontSize: 16,
    color: '#718096',
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 8,
  },
  playPauseButton: {
    backgroundColor: '#5D3FD3',
  },
  cancelButton: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  playPauseText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#E53E3E',
  },
  messageContainer: {
    backgroundColor: '#F3F0FF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  message: {
    fontSize: 16,
    color: '#5D3FD3',
    textAlign: 'center',
    lineHeight: 24,
  },
});