import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { menuStyles as styles } from '../styles/menu.styles';
import { MENU_COLORS } from '../constants/menu.constants';

interface MenuActionCardProps {
  title: string;
  subtitle?: string;
  showAddBadge?: boolean;
  onPress?: () => void;
  emphasizeTitle?: boolean;
}

export const MenuActionCard: React.FC<MenuActionCardProps> = ({
  title,
  subtitle,
  showAddBadge = false,
  onPress,
  emphasizeTitle = false,
}) => {
  return (
    <TouchableOpacity style={styles.primaryAction} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.primaryActionIconWrap}>
        <MaterialCommunityIcons name="pill" size={24} style={styles.primaryActionIcon} />
        {showAddBadge ? (
          <View style={styles.primaryActionBadge}>
            <Text style={styles.primaryActionBadgeText}>+</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.primaryActionContent}>
        <Text
          style={[
            styles.primaryActionTitle,
            emphasizeTitle ? styles.primaryActionTitleEmphasis : null,
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.primaryActionSubtitle,
              emphasizeTitle ? styles.primaryActionSubtitleEmphasis : null,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={MENU_COLORS.textMuted} />
    </TouchableOpacity>
  );
};
