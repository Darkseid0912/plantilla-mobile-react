import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { menuStyles as styles } from '../styles/menu.styles';

export const MenuBottomNav: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.bottomNavFab}
        activeOpacity={0.85}
        onPress={() => router.push('/profiles')}
      >
        <Text style={styles.bottomNavFabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
