import { useCallback, useMemo, useState } from 'react';
import { REGISTER_STRINGS } from '../constants/register.constants';
import type { RegisterErrors, RegisterFormData, RegisterResponse } from '../constants/register.types';
import { registerService } from '../services/register.service';

const INITIAL_FORM: RegisterFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  phone: '',
  acceptedTerms: false,
  acceptedPrivacy: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const useRegister = () => {
  const [form, setForm] = useState<RegisterFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = useCallback((input: RegisterFormData): RegisterErrors => {
    return {
      fullName: input.fullName.trim() ? null : REGISTER_STRINGS.validation.fullNameRequired,
      email: !input.email.trim()
        ? REGISTER_STRINGS.validation.emailRequired
        : EMAIL_REGEX.test(input.email)
          ? null
          : REGISTER_STRINGS.validation.emailInvalid,
      password: !input.password
        ? REGISTER_STRINGS.validation.passwordRequired
        : input.password.length >= 8
          ? null
          : REGISTER_STRINGS.validation.passwordMinLength,
      confirmPassword: !input.confirmPassword
        ? REGISTER_STRINGS.validation.confirmPasswordRequired
        : input.confirmPassword === input.password
          ? null
          : REGISTER_STRINGS.validation.confirmPasswordMismatch,
      birthDate: !input.birthDate.trim()
        ? REGISTER_STRINGS.validation.birthDateRequired
        : DATE_REGEX.test(input.birthDate)
          ? null
          : REGISTER_STRINGS.validation.birthDateInvalid,
      acceptedTerms: input.acceptedTerms ? null : REGISTER_STRINGS.validation.termsRequired,
      acceptedPrivacy: input.acceptedPrivacy ? null : REGISTER_STRINGS.validation.privacyRequired,
    };
  }, []);

  const isValid = useMemo(() => {
    const nextErrors = validate(form);
    return !Object.values(nextErrors).some(Boolean);
  }, [form, validate]);

  const setField = useCallback(<K extends keyof RegisterFormData>(key: K, value: RegisterFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSubmitError(null);
    setSuccess(null);
  }, []);

  const submit = useCallback(async (): Promise<RegisterResponse | null> => {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitError(null);
    setSuccess(null);

    if (Object.values(nextErrors).some(Boolean)) {
      return null;
    }

    setIsLoading(true);
    try {
      const response = await registerService.createAccount(form);
      setSuccess(REGISTER_STRINGS.successMessage);
      return response;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to create account');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [form, validate]);

  return {
    form,
    errors,
    isLoading,
    submitError,
    success,
    isValid,
    setField,
    submit,
  };
};
