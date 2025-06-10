import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Check, Clock, Users, ChevronRight } from 'lucide-react-native';
import AppButton from '@/components/AppButton';
import VideoPlayer from '@/components/VideoPlayer';
import { useState, useEffect } from 'react';
import { VideoService, GeneratedVideo } from '@/services/videoService';

export default function SessionCompleteScreen() {
  const { duration, participants } = useLocalSearchParams<{
    duration: string;
    participants: string;
  }>();
  
  const parsedDuration = parseInt(duration || '30', 10);
  const parsedParticipants = parseInt(participants || '1', 10);

  const [celebrationVideo, setCelebrationVideo] = useState<GeneratedVideo | null>(null);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  useEffect(() => {
    const generateCelebrationVideo = async () => {
      try {
        const video = await VideoService.generateSessionVideo({
          sessionType: 'completed',
          duration: parsedDuration,
          participants: parsedParticipants,
          userName: 'User', // This would come from auth context in a real app
        });
        setCelebrationVideo(video);
      } catch (error) {
        console.error('Failed to generate celebration video:', error);
      } finally {
        setIsLoadingVideo(false);
      }
    };

    generateCelebrationVideo();
  }, [parsedDuration, parsedParticipants]);
  
  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.successContainer}>
        <View style={styles.checkmarkContainer}>
          <Check size={64} color="#FFFFFF" weight="bold" />
        </View>
        
        <Text style={styles.successTitle}>Session Complete!</Text>
        <Text style={styles.successMessage}>
          Great job staying present! You've successfully completed your offline session.
        </Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Clock size={24} color="#5D3FD3" />
          <Text style={styles.statValue}>{parsedDuration} min</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Users size={24} color="#5D3FD3" />
          <Text style={styles.statValue}>{parsedParticipants}</Text>
          <Text style={styles.statLabel}>Participants</Text>
        </View>
      </View>
      
      <View style={styles.streakContainer}>
        <Text style={styles.streakTitle}>Your streak is growing!</Text>
        <Text style={styles.streakValue}>5 days</Text>
        <Text style={styles.streakMessage}>
          Keep it up! You're building meaningful connections.
        </Text>
      </View>
      
      {/* Celebration Video Section */}
      <View style={styles.videoSection}>
        <Text style={styles.videoSectionTitle}>Your Session Recap</Text>
        {isLoadingVideo ? (
          <View style={styles.videoPlaceholder}>
            <Text style={styles.loadingText}>Generating your personalized recap...</Text>
          </View>
        ) : celebrationVideo ? (
          <VideoPlayer
            videoUrl={celebrationVideo.url}
            title={celebrationVideo.title}
            style={styles.celebrationVideo}
          />
        ) : (
          <View style={styles.recapPlaceholder}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/7947961/pexels-photo-7947961.jpeg?auto=compress&cs=tinysrgb&w=600' }} 
              style={styles.recapImage} 
            />
            <View style={styles.recapOverlay}>
              <Text style={styles.comingSoonText}>Video generation unavailable</Text>
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.nextStepsContainer}>
        <Text style={styles.nextStepsTitle}>What's next?</Text>
        
        <View style={styles.nextStepItem}>
          <View style={styles.nextStepIconContainer}>
            <Users size={20} color="#4A90E2" />
          </View>
          <View style={styles.nextStepContent}>
            <Text style={styles.nextStepTitle}>Invite more friends</Text>
            <Text style={styles.nextStepDescription}>
              Growing your circle increases motivation
            </Text>
          </View>
          <ChevronRight size={20} color="#A0AEC0" />
        </View>
        
        <View style={styles.nextStepItem}>
          <View style={styles.nextStepIconContainer}>
            <Clock size={20} color="#38A169" />
          </View>
          <View style={styles.nextStepContent}>
            <Text style={styles.nextStepTitle}>Schedule a session</Text>
            <Text style={styles.nextStepDescription}>
              Plan ahead for your next connection
            </Text>
          </View>
          <ChevronRight size={20} color="#A0AEC0" />
        </View>
      </View>
      
      <AppButton
        title="Continue"
        onPress={handleContinue}
        size="large"
        style={styles.continueButton}
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
    padding: 24,
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  checkmarkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#5D3FD3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1A202C',
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    padding: 24,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A202C',
    marginTop: 8,
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
  streakContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F0FF',
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E9D8FD',
  },
  streakTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#5D3FD3',
    marginBottom: 8,
  },
  streakValue: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#5D3FD3',
    marginBottom: 8,
  },
  streakMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    textAlign: 'center',
  },
  videoSection: {
    marginVertical: 24,
  },
  videoSectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  celebrationVideo: {
    marginBottom: 16,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#F7FAFC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  recapPlaceholder: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  recapImage: {
    width: '100%',
    height: '100%',
  },
  recapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 4,
  },
  nextStepsContainer: {
    marginVertical: 24,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  nextStepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  nextStepContent: {
    flex: 1,
  },
  nextStepTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  nextStepDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 4,
  },
  continueButton: {
    marginVertical: 16,
  },
});