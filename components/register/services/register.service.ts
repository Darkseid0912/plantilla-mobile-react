import * as Crypto from 'expo-crypto';
import type { RegisterFormData, RegisterResponse } from '../constants/register.types';
import { findUserByEmail, initRegisterDatabase, insertUser } from './registerDb';

export const registerService = {
  createAccount: async (payload: RegisterFormData): Promise<RegisterResponse> => {
    await initRegisterDatabase();

    const normalizedEmail = payload.email.trim().toLowerCase();
    const existing = await findUserByEmail(normalizedEmail);

    if (existing) {
      throw new Error('El correo ya está registrado');
    }

    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      payload.password
    );

    const result = await insertUser({
      fullName: payload.fullName.trim(),
      email: normalizedEmail,
      passwordHash,
      birthDate: payload.birthDate.trim(),
      phone: payload.phone.trim(),
      acceptedTerms: payload.acceptedTerms,
      acceptedPrivacy: payload.acceptedPrivacy,
    });

    return {
      id: String(result.id),
      email: normalizedEmail,
      createdAt: result.createdAt,
    };
  },
};
