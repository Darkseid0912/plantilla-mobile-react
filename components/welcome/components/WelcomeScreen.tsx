import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WELCOME_STRINGS } from '../constants/welcome.constants';
import { welcomeStyles as styles } from '../styles/welcome.styles';

export const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <View style={styles.decorTop} />
        <View style={styles.decorBottom} />
        <View style={styles.heroCircle} />

        <View style={styles.content}>
          <View style={styles.badgeWrap}>
            <MaterialCommunityIcons name="pill" size={26} style={styles.badgeIcon} />
          </View>
          <View style={styles.badgePill}>
            <MaterialCommunityIcons name="pulse" size={14} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.badgePillText}>TU BIENESTAR, AL DIA</Text>
          </View>
          <Text style={styles.titleLead}>{WELCOME_STRINGS.titleLead}</Text>
          <Text style={styles.titleMain}>{WELCOME_STRINGS.titleMain}</Text>
          <Text style={styles.subtitle}>{WELCOME_STRINGS.subtitle}</Text>

          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.9}
            onPress={() => router.push('/menu')}
          >
            <Text style={styles.ctaText}>{WELCOME_STRINGS.cta}</Text>
            <View style={styles.ctaIconWrap}>
              <MaterialCommunityIcons name="arrow-right" size={16} style={styles.ctaIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footerSpacer} />
      </View>
    </SafeAreaView>
  );
};
