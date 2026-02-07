import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { LOGIN_COLORS } from '../constants/login.constants';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

/**
 * ⏳ LOADING SPINNER
 * Componente de carga reutilizable para el módulo de login
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  size = 'large',
  color = LOGIN_COLORS.primary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: LOGIN_COLORS.textSecondary,
    textAlign: 'center',
  },
});