import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LOGIN_COLORS, LOGIN_STRINGS } from '../constants/login.constants';
import { MessageBanner } from './MessageBanner';
import { loginStyles as styles } from '../styles/login.styles';
import type { LoginFormProps, ValidationErrors } from '../types/login.types';

/**
 * LoginForm - Formulario de login con validaciones y diseño responsivo
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  onSignUp,
  initialEmail = '',
  initialPassword = '',
  initialRemember = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(initialRemember);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    setEmail(initialEmail);
    setPassword(initialPassword);
    setRemember(initialRemember);
  }, [initialEmail, initialPassword, initialRemember]);

  // 🔍 VALIDACIONES
  const validateEmail = (val: string): string | null => {
    if (!val.trim()) return LOGIN_STRINGS.validation.emailRequired;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) return LOGIN_STRINGS.validation.emailInvalid;
    return null;
  };

  const validatePassword = (val: string): string | null => {
    if (!val) return LOGIN_STRINGS.validation.passwordRequired;
    if (val.length < 6) return LOGIN_STRINGS.validation.passwordMinLength;
    return null;
  };

  // ✅ VALIDAR FORMULARIO COMPLETO
  const formErrors = useMemo(() => {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
    };
  }, [email, password]);

  const isFormValid = !formErrors.email && !formErrors.password;

  // 🚨 OBTENER PRIMER ERROR PARA MOSTRAR EN BANNER
  const getFirstError = (): string | null => {
    if (touched.email && formErrors.email) return formErrors.email;
    if (touched.password && formErrors.password) return formErrors.password;
    return null;
  };

  const firstError = getFirstError();

  // 🗑️ LIMPIAR ERRORES
  const clearErrors = () => {
    setErrors({});
    setTouched({ email: false, password: false });
  };

  // 📝 MANEJAR CAMBIOS
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(text) }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(text) }));
    }
  };

  // 🎯 MANEJAR BLUR
  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }));
    setErrors(prev => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }));
    setErrors(prev => ({ ...prev, password: validatePassword(password) }));
  };

  // 🚀 SUBMIT
  const handleSubmit = () => {
    setTouched({ email: true, password: true });
    setErrors(formErrors);

    if (isFormValid && onSubmit) {
      onSubmit({ email: email.trim(), password, remember });
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* ERROR BANNER */}
      {firstError && !isLoading && (
        <MessageBanner 
          message={firstError} 
          type="error" 
          visible={true}
          onDismiss={clearErrors}
        />
      )}

      {/* EMAIL */}
      <View style={styles.inputGroup}>
        <View style={[
          styles.inputContainer,
          !!(errors.email && touched.email) && styles.inputError,
        ]}>
          <MaterialCommunityIcons name="email-outline" size={18} style={styles.inputIcon} />
          <TextInput
            style={styles.inputField}
            placeholder={LOGIN_STRINGS.emailPlaceholder}
            placeholderTextColor={LOGIN_COLORS.textMuted}
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleEmailBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            editable={!isLoading}
          />
        </View>
      </View>

      {/* PASSWORD */}
      <View style={styles.inputGroup}>
        <View style={styles.passwordContainer}>
          <View style={[
            styles.inputContainer,
            !!(errors.password && touched.password) && styles.inputError,
          ]}>
            <MaterialCommunityIcons name="key-outline" size={18} style={styles.inputIcon} />
            <TextInput
              style={[styles.inputField, styles.passwordInput]}
              placeholder={LOGIN_STRINGS.passwordPlaceholder}
              placeholderTextColor={LOGIN_COLORS.textMuted}
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={handlePasswordBlur}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={LOGIN_COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* FORGOT PASSWORD */}
      <TouchableOpacity style={styles.forgotPassword} disabled={isLoading}>
        <Text style={styles.forgotPasswordText}>{LOGIN_STRINGS.forgotPassword}</Text>
      </TouchableOpacity>

      {/* REMEMBER CREDENTIALS */}
      <Pressable
        style={styles.rememberRow}
        onPress={() => setRemember((prev) => !prev)}
        disabled={isLoading}
      >
        <View style={[styles.rememberBox, remember ? styles.rememberBoxChecked : null]}>
          {remember ? <Text style={styles.rememberCheck}>✓</Text> : null}
        </View>
        <Text style={styles.rememberText}>{LOGIN_STRINGS.rememberMe}</Text>
      </Pressable>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[
          styles.loginButton, 
          (isLoading || !isFormValid) && styles.loginButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={isLoading || !isFormValid}
        activeOpacity={0.8}
      >
        <View style={styles.loginButtonContent}>
          {isLoading && (
            <ActivityIndicator 
              size="small" 
              color={LOGIN_COLORS.white} 
              style={styles.buttonLoader}
            />
          )}
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Iniciando sesión...' : LOGIN_STRINGS.loginButton}
          </Text>
        </View>
      </TouchableOpacity>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{LOGIN_STRINGS.footerText} </Text>
        <TouchableOpacity disabled={isLoading} onPress={onSignUp}>
          <Text style={styles.signUpText}>
            {LOGIN_STRINGS.signUp}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOADING OVERLAY */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={LOGIN_COLORS.primary} />
        </View>
      )}
    </View>
  );
};
