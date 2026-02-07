import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { REGISTER_STRINGS } from '../constants/register.constants';
import { registerStyles as styles } from '../styles/register.styles';

export const RegisterHeader: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logo}>
        <MaterialCommunityIcons name="check" size={30} style={styles.logoIcon} />
      </View>
      <Text style={styles.title}>{REGISTER_STRINGS.title}</Text>
      <Text style={styles.subtitle}>{REGISTER_STRINGS.subtitle}</Text>
    </View>
  );
};
