import { useState, useCallback } from 'react';

import { Feathers } from './useFeathers';

export default () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  /**
  |--------------------------------------------------
  | authenticate
  |--------------------------------------------------
  */
  const authenticate = useCallback(async data => {
    try {
      setLoading(true);
      const response = await Feathers.authenticate(data);
      setResponse(response);
      setAuthenticated(true);
    } catch(err) {
      setError(err.message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return [authenticate, response, authenticated, loading, error];  
};
