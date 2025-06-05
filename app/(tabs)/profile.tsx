import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Alert,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Settings, Bell, Lock, CircleHelp as HelpCircle, Share2, Star, LogOut, ChevronRight } from 'lucide-react-native';
import AppButton from '@/components/AppButton';

export default function Profile() {
  const { user, signOut } = useAuth();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleShareApp = () => {
    // In a real app, you would use the Share API
    if (Platform.OS === 'web') {
      alert('Sharing is not available on web');
    } else {
      // Share.share would be used here
      alert('Sharing functionality would open here');
    }
  };
  
  const handleUpgrade = () => {
    // Navigate to upgrade screen
    console.log('Navigate to upgrade screen');
  };
  
  const renderSettingsItem = (
    icon: React.ReactNode,
    title: string,
    onPress?: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity 
      style={styles.settingsItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingsItemLeft}>
        {icon}
        <Text style={styles.settingsItemText}>{title}</Text>
      </View>
      {rightElement || <ChevronRight size={20} color="#A0AEC0" />}
    </TouchableOpacity>
  );
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <Image 
          source={
            user?.profilePicture 
              ? { uri: user.profilePicture } 
              : require('../../assets/images/default-avatar.jpeg')
          } 
          style={styles.profileImage} 
        />
        
        <Text style={styles.profileName}>{user?.name || 'User'}</Text>
        <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.premiumBanner}>
        <View style={styles.premiumContent}>
          <Star size={24} color="#F9A826" />
          <View style={styles.premiumTextContainer}>
            <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
            <Text style={styles.premiumDescription}>
              Get access to exclusive features
            </Text>
          </View>
        </View>
        <AppButton
          title="Upgrade"
          onPress={handleUpgrade}
          variant="secondary"
          size="small"
        />
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        {renderSettingsItem(
          <Bell size={20} color="#4A90E2" style={styles.settingsIcon} />,
          'Notifications',
          undefined,
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E2E8F0', true: '#C7D2FE' }}
            thumbColor={notificationsEnabled ? '#5D3FD3' : '#A0AEC0'}
          />
        )}
        
        {renderSettingsItem(
          <Lock size={20} color="#38A169" style={styles.settingsIcon} />,
          'Privacy',
          () => console.log('Navigate to privacy settings')
        )}
        
        {renderSettingsItem(
          <Settings size={20} color="#DD6B20" style={styles.settingsIcon} />,
          'Dark Mode',
          undefined,
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#E2E8F0', true: '#C7D2FE' }}
            thumbColor={darkModeEnabled ? '#5D3FD3' : '#A0AEC0'}
          />
        )}
      </View>
      
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        {renderSettingsItem(
          <HelpCircle size={20} color="#805AD5" style={styles.settingsIcon} />,
          'Help & Support',
          () => console.log('Navigate to help')
        )}
        
        {renderSettingsItem(
          <Share2 size={20} color="#3182CE" style={styles.settingsIcon} />,
          'Invite Friends',
          handleShareApp
        )}
      </View>
      
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <LogOut size={20} color="#E53E3E" style={styles.signOutIcon} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E2E8F0',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A202C',
    marginTop: 16,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#718096',
    marginTop: 4,
  },
  editProfileButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F0FF',
    borderWidth: 1,
    borderColor: '#E9D8FD',
  },
  editProfileText: {
    color: '#5D3FD3',
    fontFamily: 'Inter-Medium',
  },
  premiumBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#FCEFC7',
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  premiumTextContainer: {
    marginLeft: 12,
  },
  premiumTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1A202C',
  },
  premiumDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A202C',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 16,
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#E53E3E',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#A0AEC0',
  },
});