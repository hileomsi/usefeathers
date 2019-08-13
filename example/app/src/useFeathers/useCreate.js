import { useState, useEffect, useCallback } from 'react';

import { destructuringCreateParams } from './helpers';
import { Feathers } from './useFeathers';

export default (...args) => {
  const { path, data: dataDefault, query: queryDefault, isFunction } = destructuringCreateParams(...args);
  const [query, setQuery] = useState(queryDefault);
  const [data, setData] = useState(dataDefault);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
  |--------------------------------------------------
  | create
  |--------------------------------------------------
  */
  const create = useCallback(async (dataParam = data, queryParam = query) => {
    const Service = Feathers.service(path);

    try {
      setQuery(queryParam);
      setLoading(true);
      const response = await Service.create(dataParam, { query: queryParam });
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
      create(data, query);
    }, []);
  }

  if(isFunction) return [create, data, loading, error];
  return [data, loading, error];
};