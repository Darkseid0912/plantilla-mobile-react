import { useCallback, useState } from 'react';
import type { ProfileFormData, ProfileResponse } from '../types/profiles.types';
import { profilesService } from '../services/profiles.service';

const INITIAL_FORM: ProfileFormData = {
  name: '',
  relation: '',
  birthDate: '',
  allergies: '',
  doctor: '',
};

export const useProfileForm = () => {
  const [form, setForm] = useState<ProfileFormData>(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const setField = useCallback(<K extends keyof ProfileFormData>(key: K, value: ProfileFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSuccess(null);
  }, []);

  const clear = useCallback(() => {
    setForm(INITIAL_FORM);
    setError(null);
    setSuccess(null);
  }, []);

  const dismissMessage = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const save = useCallback(async (): Promise<ProfileResponse | null> => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (!form.name.trim()) {
        setError('El nombre es obligatorio');
        return null;
      }
      if (!form.relation.trim()) {
        setError('La relacion es obligatoria');
        return null;
      }
      if (!form.birthDate.trim()) {
        setError('La fecha de nacimiento es obligatoria');
        return null;
      }
      if (!form.allergies.trim()) {
        setError('Las alergias o condiciones son obligatorias');
        return null;
      }

      const response = await profilesService.createProfile(form);
      setSuccess('Perfil guardado');
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar');
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [form]);

  return {
    form,
    isSaving,
    error,
    success,
    setField,
    save,
    clear,
    dismissMessage,
  };
};
