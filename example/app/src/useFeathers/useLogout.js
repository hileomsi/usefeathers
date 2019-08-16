import { useCallback } from 'react';

import { Feathers } from './useFeathers';

export default () => {
  const logout = useCallback(() => {
    return Feathers.logout();
  }, []);

  return [logout];
};