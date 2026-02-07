import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { RegisterForm } from './RegisterForm';
import { RegisterHeader } from './RegisterHeader';
import { registerStyles as styles } from '../styles/register.styles';

export const RegisterScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <View style={styles.decorTop} />
        <View style={styles.decorBottom} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <RegisterHeader />
          <View style={styles.card}>
            <RegisterForm onBackToLogin={() => router.push('/login')} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
