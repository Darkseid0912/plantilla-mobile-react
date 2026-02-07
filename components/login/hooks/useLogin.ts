import { useCallback, useEffect, useState } from 'react';
import { loginService } from '../services/login.service';
import type { LoginCredentials, LoginSubmitPayload } from '../types/login.types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rememberedEmail, setRememberedEmail] = useState<string>('');
  const [rememberedPassword, setRememberedPassword] = useState<string>('');
  const [rememberEnabled, setRememberEnabled] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadRemembered = async () => {
      try {
        const remembered = await loginService.getRememberedCredentials();
        if (!mounted || !remembered) return;
        setRememberedEmail(remembered.email);
        setRememberedPassword(remembered.password);
        setRememberEnabled(true);
      } catch {
        // ignore
      }
    };

    loadRemembered();
    return () => {
      mounted = false;
    };
  }, []);

  // ESTADO + LOGICA del login
  const login = useCallback(async (payload: LoginSubmitPayload) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { remember, ...credentials } = payload;
      const response = await loginService.authenticate(credentials);

      if (remember) {
        await loginService.setRememberedCredentials(credentials.email, credentials.password);
      } else {
        await loginService.clearRememberedCredentials();
      }

      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await loginService.logout();
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await loginService.resetPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar recuperación');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estado
    isLoading,
    error,
    isAuthenticated,
    rememberedEmail,
    rememberedPassword,
    rememberEnabled,
    
    // Acciones
    login,
    logout,
    resetPassword,
    clearError,
  };
};
