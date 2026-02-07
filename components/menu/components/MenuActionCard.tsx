import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { menuStyles as styles } from '../styles/menu.styles';

export const MenuActionCard: React.FC = () => {
  return (
    <TouchableOpacity style={styles.primaryAction} activeOpacity={0.9}>
      <View style={styles.primaryActionIconWrap}>
        <MaterialCommunityIcons name="pill" size={24} style={styles.primaryActionIcon} />
        <View style={styles.primaryActionBadge}>
          <Text style={styles.primaryActionBadgeText}>+</Text>
        </View>
      </View>
      <View style={styles.primaryActionContent}>
        <Text style={styles.primaryActionTitle}>Agregar recordatorio</Text>
        <Text style={styles.primaryActionSubtitle}>Configura tu próxima dosis</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} style={styles.primaryActionArrow} />
    </TouchableOpacity>
  );
};
