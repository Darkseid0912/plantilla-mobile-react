import { useEffect, useState } from 'react';
import { profilesService } from '../../profiles/services/profiles.service';

export const useMenuProfiles = () => {
  const [profiles, setProfiles] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadProfiles = async () => {
      setIsLoading(true);
      try {
        const data = await profilesService.getProfilesByCurrentUser();
        if (mounted) {
          setProfiles(data);
        }
      } catch {
        if (mounted) {
          setProfiles([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfiles();
    return () => {
      mounted = false;
    };
  }, []);

  return { profiles, isLoading };
};
