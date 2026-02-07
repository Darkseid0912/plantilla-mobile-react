import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LOGIN_STRINGS } from '../constants/login.constants';
import { loginStyles as styles } from '../styles/login.styles';
import type { LoginHeaderProps } from '../types/login.types';

/**
 * LoginHeader - Componente de cabecera con logo y títulos
 */
export const LoginHeader: React.FC<LoginHeaderProps> = ({
  title = LOGIN_STRINGS.title,
  subtitle = LOGIN_STRINGS.subtitle,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo placeholder */}
      <View style={styles.logoPlaceholder}>
        <MaterialCommunityIcons name="check" size={30} style={styles.logoIcon} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
