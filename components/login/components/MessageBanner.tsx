import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LOGIN_COLORS, LOGIN_CONFIG } from '../constants/login.constants';

interface MessageBannerProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onDismiss?: () => void;
  visible?: boolean;
}

/**
 * 📢 MESSAGE BANNER
 * Componente para mostrar mensajes de error, éxito o información
 */
export const MessageBanner: React.FC<MessageBannerProps> = ({
  message,
  type,
  onDismiss,
  visible = true,
}) => {
  if (!visible) return null;

  const getStylesByType = () => {
    switch (type) {
      case 'error':
        return {
          container: styles.errorContainer,
          text: styles.errorText,
        };
      case 'success':
        return {
          container: styles.successContainer,
          text: styles.successText,
        };
      case 'info':
      default:
        return {
          container: styles.infoContainer,
          text: styles.infoText,
        };
    }
  };

  const typeStyles = getStylesByType();

  return (
    <View style={[styles.container, typeStyles.container]}>
      <Text style={[styles.message, typeStyles.text]}>
        {message}
      </Text>
      {onDismiss && (
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={onDismiss}
          activeOpacity={0.7}
        >
          <Text style={styles.dismissText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: LOGIN_CONFIG.spacing.md,
    borderRadius: LOGIN_CONFIG.borderRadius,
    marginBottom: LOGIN_CONFIG.spacing.md,
    borderLeftWidth: 4,
  },
  message: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  dismissButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: LOGIN_CONFIG.spacing.sm,
  },
  dismissText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LOGIN_COLORS.textSecondary,
  },
  
  // Error styles
  errorContainer: {
    backgroundColor: '#FFEBEE',
    borderLeftColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
  },
  
  // Success styles
  successContainer: {
    backgroundColor: '#E8F5E9',
    borderLeftColor: '#4CAF50',
  },
  successText: {
    color: '#2E7D32',
  },
  
  // Info styles
  infoContainer: {
    backgroundColor: '#E3F2FD',
    borderLeftColor: LOGIN_COLORS.primary,
  },
  infoText: {
    color: '#1565C0',
  },
});