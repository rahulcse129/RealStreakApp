import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UserPlus, Check, X } from 'lucide-react-native';

export interface Friend {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  status: 'connected' | 'pending' | 'requested';
}

interface FriendCardProps {
  friend: Friend;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onConnect?: (id: string) => void;
}

export default function FriendCard({ 
  friend, 
  onAccept, 
  onReject, 
  onConnect 
}: FriendCardProps) {
  const renderActionButtons = () => {
    if (friend.status === 'pending') {
      return (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.acceptButton]} 
            onPress={() => onAccept?.(friend.id)}
          >
            <Check size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]} 
            onPress={() => onReject?.(friend.id)}
          >
            <X size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      );
    } else if (friend.status === 'requested') {
      return (
        <View style={styles.requestedBadge}>
          <Text style={styles.requestedText}>REQUESTED</Text>
        </View>
      );
    } else if (friend.status === 'connected') {
      return (
        <View style={styles.connectedBadge}>
          <Text style={styles.connectedText}>CONNECTED</Text>
        </View>
      );
    }
    
    return (
      <TouchableOpacity 
        style={styles.connectButton} 
        onPress={() => onConnect?.(friend.id)}
      >
        <UserPlus size={16} color="#FFFFFF" />
        <Text style={styles.connectText}>Connect</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image 
          source={
            friend.profilePicture 
              ? { uri: friend.profilePicture } 
              : require('../assets/default-avatar.png')
          } 
          style={styles.profileImage} 
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{friend.name}</Text>
          <Text style={styles.email}>{friend.email}</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        {renderActionButtons()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
  },
  infoContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
  },
  email: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: '#38A169',
  },
  rejectButton: {
    backgroundColor: '#E53E3E',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D3FD3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  connectText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  requestedBadge: {
    backgroundColor: '#F9A826',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  requestedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  connectedBadge: {
    backgroundColor: '#38A169',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  connectedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});