import { useState, useEffect, useCallback } from 'react';

import { destructuringRemoveParams } from './helpers';
import { Feathers } from './useFeathers';

export default (...args) => {
  const { path, id: idDefault, query: queryDefault, isFunction } = destructuringRemoveParams(...args);
  const [id] = useState(idDefault);
  const [query, setQuery] = useState(queryDefault);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
  |--------------------------------------------------
  | remove
  |--------------------------------------------------
  */
  const remove = useCallback(async (idParam, queryParam) => {
    const Service = Feathers.service(path);

    try {
      setQuery(queryParam);
      setLoading(true);
      const response = await Service.remove(idParam, { query: queryParam });
      setData(response);
      setError(null);

      return response;
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path, query]);

  if(!isFunction) {
    useEffect(() => {
      remove(id, data, query);
    }, []);
  }

  if(isFunction) return [remove, data, loading, error];
  return [data, loading, error];
};