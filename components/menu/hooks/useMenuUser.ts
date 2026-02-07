import { useEffect, useState } from 'react';
import { loginService } from '../../login/services/login.service';

export const useMenuUser = () => {
  const [name, setName] = useState<string>('Usuario');

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const user = await loginService.getCurrentUser();
        if (mounted && user?.name) {
          setName(user.name);
        }
      } catch {
        // ignore
      }
    };

    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  return { name };
};
