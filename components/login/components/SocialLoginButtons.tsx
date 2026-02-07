import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LOGIN_COLORS, LOGIN_CONFIG, LOGIN_STRINGS } from '../constants/login.constants';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook' | 'apple';
  onPress: () => void;
  disabled?: boolean;
}

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  onAppleLogin?: () => void;
  disabled?: boolean;
}

/**
 * 🔑 SOCIAL LOGIN BUTTON
 * Botón individual para login con redes sociales
 */
const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  disabled = false,
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          title: 'Continuar con Google',
          backgroundColor: '#FFFFFF',
          textColor: '#1F1F1F',
          borderColor: '#DADCE0',
        };
      case 'facebook':
        return {
          title: 'Continuar con Facebook',
          backgroundColor: '#1877F2',
          textColor: '#FFFFFF',
          borderColor: '#1877F2',
        };
      case 'apple':
        return {
          title: 'Continuar con Apple',
          backgroundColor: '#000000',
          textColor: '#FFFFFF',
          borderColor: '#000000',
        };
      default:
        return {
          title: 'Continuar',
          backgroundColor: LOGIN_COLORS.primary,
          textColor: '#FFFFFF',
          borderColor: LOGIN_COLORS.primary,
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      style={[
        styles.socialButton,
        {
          backgroundColor: disabled ? LOGIN_COLORS.inputBackground : config.backgroundColor,
          borderColor: disabled ? LOGIN_COLORS.border : config.borderColor,
        },
        disabled && styles.socialButtonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.socialButtonText,
          { 
            color: disabled 
              ? LOGIN_COLORS.textSecondary 
              : config.textColor 
          },
        ]}
      >
        {config.title}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * 🔗 SOCIAL LOGIN BUTTONS
 * Grupo de botones para login con redes sociales
 */
export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGoogleLogin,
  onFacebookLogin,
  onAppleLogin,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Divider con texto */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>o continúa con</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Botones sociales */}
      <View style={styles.buttonsContainer}>
        {onGoogleLogin && (
          <SocialLoginButton
            provider="google"
            onPress={onGoogleLogin}
            disabled={disabled}
          />
        )}
        
        {onFacebookLogin && (
          <SocialLoginButton
            provider="facebook"
            onPress={onFacebookLogin}
            disabled={disabled}
          />
        )}
        
        {onAppleLogin && (
          <SocialLoginButton
            provider="apple"
            onPress={onAppleLogin}
            disabled={disabled}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: LOGIN_CONFIG.spacing.lg,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LOGIN_CONFIG.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: LOGIN_COLORS.border,
  },
  dividerText: {
    marginHorizontal: LOGIN_CONFIG.spacing.md,
    fontSize: 14,
    color: LOGIN_COLORS.textSecondary,
  },
  buttonsContainer: {
    gap: LOGIN_CONFIG.spacing.sm,
  },
  socialButton: {
    height: LOGIN_CONFIG.buttonHeight,
    borderRadius: LOGIN_CONFIG.borderRadius,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  socialButtonDisabled: {
    opacity: 0.6,
    elevation: 0,
    shadowOpacity: 0,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});