// Mock video service for generating session videos
// In a real app, this would integrate with a video generation API

export interface VideoGenerationOptions {
  sessionType: 'completed' | 'cancelled';
  duration: number;
  participants: number;
  userName?: string;
}

export interface GeneratedVideo {
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
}

// Mock video URLs from Pexels for different scenarios
const MOCK_VIDEOS = {
  completed: [
    'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/4099355/4099355-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4',
  ],
  cancelled: [
    'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
    'https://videos.pexels.com/video-files/4099355/4099355-uhd_2560_1440_30fps.mp4',
  ],
};

export class VideoService {
  static async generateSessionVideo(options: VideoGenerationOptions): Promise<GeneratedVideo> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { sessionType, duration, participants, userName = 'User' } = options;
    
    // Select random video based on session type
    const videoPool = MOCK_VIDEOS[sessionType];
    const randomVideo = videoPool[Math.floor(Math.random() * videoPool.length)];
    
    const title = sessionType === 'completed' 
      ? `🎉 Session Complete - ${duration} minutes!`
      : `⏸️ Session Paused - ${duration} minutes completed`;
    
    const description = sessionType === 'completed'
      ? `Congratulations ${userName}! You successfully completed a ${duration}-minute session with ${participants} participant${participants > 1 ? 's' : ''}. Keep building those meaningful connections!`
      : `No worries ${userName}! You completed ${duration} minutes of your session with ${participants} participant${participants > 1 ? 's' : ''}. Every moment counts towards building stronger relationships.`;
    
    return {
      url: randomVideo,
      title,
      description,
    };
  }
  
  static async generateMotivationalVideo(): Promise<GeneratedVideo> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const motivationalVideos = [
      'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
      'https://videos.pexels.com/video-files/4099355/4099355-uhd_2560_1440_30fps.mp4',
    ];
    
    const randomVideo = motivationalVideos[Math.floor(Math.random() * motivationalVideos.length)];
    
    return {
      url: randomVideo,
      title: '💪 Stay Connected, Stay Strong',
      description: 'Remember, every moment you spend present with others builds stronger, more meaningful relationships. Keep going!',
    };
  }
}