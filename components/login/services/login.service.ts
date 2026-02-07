import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import type { LoginCredentials } from '../types/login.types';
import { getUserByEmail, initLoginDatabase } from './loginDb';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_EMAIL_KEY = 'auth_email';
const REMEMBER_EMAIL_KEY = 'remember_email';
const REMEMBER_PASSWORD_KEY = 'remember_password';

// 📡 HTTP CLIENT para autenticación
export const loginService = {
  /**
   * POST /api/auth/login
   * Autenticar usuario con email y password
   */
  authenticate: async (credentials: LoginCredentials): Promise<{
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  }> => {
    await initLoginDatabase();

    const normalizedEmail = credentials.email.trim().toLowerCase();
    const user = await getUserByEmail(normalizedEmail);

    if (!user) {
      throw new Error('El usuario no existe');
    }

    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      credentials.password
    );

    if (passwordHash !== user.passwordHash) {
      throw new Error('La contraseña no coincide');
    }

    const token = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${normalizedEmail}:${Date.now()}`
    );

    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    await SecureStore.setItemAsync(AUTH_EMAIL_KEY, normalizedEmail);

    return {
      token,
      user: {
        id: String(user.id),
        email: user.email,
        name: user.fullName,
      },
    };
  },

  /**
   * POST /api/auth/logout
   * Cerrar sesión del usuario
   */
  logout: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(AUTH_EMAIL_KEY);
  },

  /**
   * POST /api/auth/forgot-password
   * Solicitar recuperación de contraseña
   */
  resetPassword: async (email: string): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && email.includes('@')) {
          resolve({
            message: 'Se ha enviado un enlace de recuperación a tu correo'
          });
        } else {
          reject(new Error('Email inválido'));
        }
      }, 1000);
    });
  },

  /**
   * GET /api/auth/me
   * Obtener información del usuario autenticado
   */
  getCurrentUser: async (): Promise<{
    id: string;
    email: string;
    name: string;
  }> => {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    const email = await SecureStore.getItemAsync(AUTH_EMAIL_KEY);

    if (!token || !email) {
      throw new Error('No autenticado');
    }

    await initLoginDatabase();
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error('No autenticado');
    }

    return {
      id: String(user.id),
      email: user.email,
      name: user.fullName,
    };
  },

  /**
   * POST /api/auth/refresh-token
   * Renovar token de autenticación
   */
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        const canRefresh = true;

        if (canRefresh) {
          resolve({
            token: 'new_mock_jwt_token_67890',
          });
        } else {
          reject(new Error('No se pudo renovar el token'));
        }
      }, 800);
    });

    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, response.token);
    return response;
  },

  getRememberedCredentials: async (): Promise<{ email: string; password: string } | null> => {
    const email = await SecureStore.getItemAsync(REMEMBER_EMAIL_KEY);
    const password = await SecureStore.getItemAsync(REMEMBER_PASSWORD_KEY);

    if (!email || !password) {
      return null;
    }

    return { email, password };
  },

  setRememberedCredentials: async (email: string, password: string): Promise<void> => {
    await SecureStore.setItemAsync(REMEMBER_EMAIL_KEY, email);
    await SecureStore.setItemAsync(REMEMBER_PASSWORD_KEY, password);
  },

  clearRememberedCredentials: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(REMEMBER_EMAIL_KEY);
    await SecureStore.deleteItemAsync(REMEMBER_PASSWORD_KEY);
  },
};
