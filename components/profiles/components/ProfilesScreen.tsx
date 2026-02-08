import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { profilesStyles as styles } from '../styles/profiles.styles';
import { ProfileForm } from './ProfileForm';
import { PROFILES_STRINGS } from '../constants/profiles.constants';

export const ProfilesScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <View style={styles.topBackground}>
          <View style={styles.decorCircleTop} />
          <View style={styles.decorCircleRight} />
          <View style={styles.topHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/menu')}>
              <MaterialCommunityIcons name="chevron-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.logo}>
              <MaterialCommunityIcons name="account" size={30} style={styles.logoIcon} />
            </View>
            <Text style={styles.title}>{PROFILES_STRINGS.title}</Text>
            <Text style={styles.subtitle}>{PROFILES_STRINGS.subtitle}</Text>
          </View>
        </View>
        <View style={styles.bottomBackground} />
        <View style={styles.formWrapper}>
          <ProfileForm />
        </View>
      </View>
    </SafeAreaView>
  );
};
