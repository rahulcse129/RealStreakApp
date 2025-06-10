import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import CircularProgress from './CircularProgress';
import VideoPlayer from './VideoPlayer';
import { Play, Pause, CircleStop as StopCircle, X } from 'lucide-react-native';
import { VideoService, GeneratedVideo } from '@/services/videoService';
import AppButton from './AppButton';

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
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0 && !isCompleted) {
      setIsCompleted(true);
      handleSessionComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, isCompleted]);
  
  const handleSessionComplete = async () => {
    setIsGeneratingVideo(true);
    setShowVideoModal(true);
    
    try {
      const video = await VideoService.generateSessionVideo({
        sessionType: 'completed',
        duration: duration,
        participants: 1, // This would come from props in a real app
        userName: 'User', // This would come from auth context
      });
      
      setGeneratedVideo(video);
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };
  
  const handleSessionCancel = async () => {
    const completedMinutes = Math.floor((duration * 60 - secondsLeft) / 60);
    
    setIsGeneratingVideo(true);
    setShowVideoModal(true);
    
    try {
      const video = await VideoService.generateSessionVideo({
        sessionType: 'cancelled',
        duration: completedMinutes,
        participants: 1, // This would come from props in a real app
        userName: 'User', // This would come from auth context
      });
      
      setGeneratedVideo(video);
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const progress = ((duration * 60 - secondsLeft) / (duration * 60)) * 100;
  
  const handleVideoEnd = () => {
    setShowVideoModal(false);
    setGeneratedVideo(null);
    
    if (isCompleted) {
      onComplete();
    } else {
      onCancel();
    }
  };
  
  const handleCloseVideo = () => {
    setShowVideoModal(false);
    setGeneratedVideo(null);
    
    if (isCompleted) {
      onComplete();
    } else {
      onCancel();
    }
  };
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <CircularProgress
            size={240}
            width={16}
            fill={progress}
            tintColor="#5D3FD3"
            backgroundColor="#E2E8F0"
          >
            {() => (
              <View style={styles.timerContent}>
                <Text style={styles.timeText}>{formatTime(secondsLeft)}</Text>
                <Text style={styles.minutesText}>
                  {isActive ? 'Time remaining' : 'Paused'}
                </Text>
              </View>
            )}
          </CircularProgress>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, styles.cancelButton]} 
            onPress={handleSessionCancel}
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
      
      <Modal
        visible={showVideoModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseVideo}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={handleCloseVideo}
            >
              <X size={24} color="#4A5568" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            {isGeneratingVideo ? (
              <View style={styles.generatingContainer}>
                <Text style={styles.generatingTitle}>Creating your session video...</Text>
                <Text style={styles.generatingSubtitle}>
                  We're putting together a personalized recap of your session
                </Text>
              </View>
            ) : generatedVideo ? (
              <>
                <VideoPlayer
                  videoUrl={generatedVideo.url}
                  title={generatedVideo.title}
                  onVideoEnd={handleVideoEnd}
                  style={styles.videoPlayer}
                />
                
                <View style={styles.videoInfo}>
                  <Text style={styles.videoDescription}>
                    {generatedVideo.description}
                  </Text>
                </View>
                
                <AppButton
                  title="Continue"
                  onPress={handleCloseVideo}
                  style={styles.continueButton}
                />
              </>
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorTitle}>Unable to generate video</Text>
                <Text style={styles.errorSubtitle}>
                  Don't worry, your session progress has been saved!
                </Text>
                <AppButton
                  title="Continue"
                  onPress={handleCloseVideo}
                  style={styles.continueButton}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  generatingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  generatingTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 16,
  },
  generatingSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  videoPlayer: {
    marginBottom: 24,
  },
  videoInfo: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  videoDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 24,
    textAlign: 'center',
  },
  continueButton: {
    marginTop: 'auto',
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
});