import React from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { MessageBanner } from './MessageBanner';
import { useLogin } from '../hooks/useLogin';
import { loginStyles as styles } from '../styles/login.styles';
import type { LoginSubmitPayload } from '../types/login.types';

/**
 * LoginScreen - Componente principal del módulo Login
 * Diseño responsivo para Móvil y Web
 */
export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const {
    login,
    isLoading,
    error,
    clearError,
    rememberedEmail,
    rememberedPassword,
    rememberEnabled,
  } = useLogin();

  const handleLogin = async (payload: LoginSubmitPayload) => {
    try {
      await login(payload);
      router.push('/welcome');
    } catch {
      // El error ya es manejado por el hook useLogin y mostrado en el formulario
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <View style={styles.decorTop} />
        <View style={styles.decorBottom} />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header con logo y título */}
          <LoginHeader />

          <View style={styles.card}>
            {error ? (
              <MessageBanner message={error} type="error" onDismiss={clearError} />
            ) : null}

            {/* Formulario de login con validaciones y lógica conectada */}
            <LoginForm 
              onSubmit={handleLogin} 
              isLoading={isLoading} 
              onSignUp={() => router.push('/register')}
              initialEmail={rememberedEmail}
              initialPassword={rememberedPassword}
              initialRemember={rememberEnabled}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
