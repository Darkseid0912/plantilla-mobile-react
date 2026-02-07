import React, { useRef, useState } from 'react';
import { Animated, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { menuStyles as styles } from '../styles/menu.styles';
import { MENU_CONFIG } from '../constants/menu.constants';
import { MenuSidebar } from './MenuSidebar';
import { useMenuUser } from '../hooks/useMenuUser';
import { MenuBottomNav } from './MenuBottomNav';
import { MenuActionCard } from './MenuActionCard';

export const MenuScreen: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarTranslateX = useRef(new Animated.Value(-260)).current;
  const { name } = useMenuUser();

  const openSidebar = () => {
    setIsSidebarOpen(true);
    Animated.timing(sidebarTranslateX, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarTranslateX, {
      toValue: -260,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIsSidebarOpen(false);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        {isSidebarOpen ? (
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeSidebar} />
        ) : null}

        <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarTranslateX }] }]}>
          <MenuSidebar />
        </Animated.View>

        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8} onPress={openSidebar}>
            <MaterialCommunityIcons
              name="menu"
              size={MENU_CONFIG.iconSize}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={MENU_CONFIG.iconSize}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Hola, {name}</Text>
          <Text style={styles.greetingSubtitle}>¿Cómo puedo ayudarte hoy?</Text>
        </View>

        <View style={styles.greetingDivider} />

        <View style={styles.actionArea}>
          <MenuActionCard />
        </View>

        <MenuBottomNav />
      </View>
    </SafeAreaView>
  );
};
