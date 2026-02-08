import type { ProfileFormData, ProfileResponse } from '../types/profiles.types';
import { loginService } from '../../login/services/login.service';
import { getProfilesByUserId, initProfilesDatabase, insertProfile } from './profilesDb';

export const profilesService = {
  createProfile: async (payload: ProfileFormData): Promise<ProfileResponse> => {
    await initProfilesDatabase();

    const user = await loginService.getCurrentUser();
    const userId = Number(user.id);

    if (!userId) {
      throw new Error('No autenticado');
    }

    const result = await insertProfile({
      userId,
      name: payload.name.trim(),
      relation: payload.relation.trim(),
      birthDate: payload.birthDate.trim(),
      allergies: payload.allergies.trim(),
      doctor: payload.doctor.trim(),
    });

    return {
      id: String(result.id),
      createdAt: result.createdAt,
    };
  },

  getProfilesByCurrentUser: async (): Promise<Array<{ id: string; name: string }>> => {
    await initProfilesDatabase();

    const user = await loginService.getCurrentUser();
    const userId = Number(user.id);

    if (!userId) {
      throw new Error('No autenticado');
    }

    const profiles = await getProfilesByUserId(userId);
    return profiles.map((profile) => ({ id: String(profile.id), name: profile.name }));
  },
};
