import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { Search, UserPlus } from 'lucide-react-native';
import FriendCard, { Friend } from '@/components/FriendCard';
import AppButton from '@/components/AppButton';

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for demo purposes
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'connected',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'connected',
    },
    {
      id: '3',
      name: 'Aisha Patel',
      email: 'aisha.p@example.com',
      profilePicture: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'pending',
    },
    {
      id: '4',
      name: 'James Wilson',
      email: 'james.w@example.com',
      profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'requested',
    },
  ]);
  
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAcceptFriend = (id: string) => {
    console.log('Accept friend:', id);
    // Update friend status to 'connected'
  };
  
  const handleRejectFriend = (id: string) => {
    console.log('Reject friend:', id);
    // Remove friend from list
  };
  
  const handleConnectFriend = (id: string) => {
    console.log('Connect with friend:', id);
    // Send friend request
  };
  
  const handleSendInvite = () => {
    if (!inviteEmail) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Invite sent to:', inviteEmail);
      setInviteEmail('');
      setShowInviteForm(false);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#718096" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#A0AEC0"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.inviteButton}
          onPress={() => setShowInviteForm(!showInviteForm)}
        >
          <UserPlus size={20} color="#5D3FD3" />
        </TouchableOpacity>
      </View>
      
      {showInviteForm && (
        <View style={styles.inviteFormContainer}>
          <Text style={styles.inviteTitle}>Invite a Friend</Text>
          <TextInput
            style={styles.inviteInput}
            placeholder="Enter email address"
            value={inviteEmail}
            onChangeText={setInviteEmail}
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
          />
          <AppButton
            title="Send Invite"
            onPress={handleSendInvite}
            loading={isLoading}
            style={styles.sendInviteButton}
          />
        </View>
      )}
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, styles.activeTab]}
        >
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Connected</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Pending</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendCard
            friend={item}
            onAccept={handleAcceptFriend}
            onReject={handleRejectFriend}
            onConnect={handleConnectFriend}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No friends found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#1A202C',
    fontFamily: 'Inter-Regular',
  },
  inviteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F0FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9D8FD',
  },
  inviteFormContainer: {
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  inviteTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  inviteInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  sendInviteButton: {
    marginTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#F3F0FF',
  },
  tabText: {
    color: '#4A5568',
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#5D3FD3',
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    fontFamily: 'Inter-Medium',
  },
});