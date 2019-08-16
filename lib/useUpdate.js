import { useState, useEffect, useCallback } from 'react';

import { destructuringPatchAndUpdateParams } from './helpers';
import { Feathers } from './useFeathers';

export default (...args) => {
  const { path, id: idDefault, data: dataDefault, query: queryDefault, isFunction } = destructuringPatchAndUpdateParams(...args);
  const [id] = useState(idDefault);
  const [query, setQuery] = useState(queryDefault);
  const [data, setData] = useState(dataDefault);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
  |--------------------------------------------------
  | update
  |--------------------------------------------------
  */
  const update = useCallback(async (idParam, dataParam, queryParam) => {
    const Service = Feathers.service(path);

    try {
      setQuery(queryParam);
      setLoading(true);
      const response = await Service.update(idParam, dataParam, { query: queryParam });
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
      update(id, data, query);
    }, []);
  }

  if(isFunction) return [update, data, loading, error];
  return [data, loading, error];
};