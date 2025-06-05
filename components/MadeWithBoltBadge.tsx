import { Linking, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function MadeWithBoltBadge() {
  const handlePress = () => {
    Linking.openURL('https://bolt.new');
  };

  return (
    <TouchableOpacity style={styles.badge} onPress={handlePress}>
      <Text style={styles.badgeText}>🚀 Made with Bolt.new</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 100,
    opacity: 0.85,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
