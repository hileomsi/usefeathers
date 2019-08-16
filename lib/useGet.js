import { useState, useEffect, useCallback } from 'react';

import { destructuringGetParams } from './helpers';
import { Feathers } from './useFeathers';

export default (...args) => {
  const { path, id: idTemp, query: queryTemp, options, isFunction } = destructuringGetParams(...args);
  const { realtime } = options;
  const [id, setId] = useState(idTemp);
  const [query, setQuery] = useState(queryTemp);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
  |--------------------------------------------------
  | get
  |--------------------------------------------------
  */
  const get = useCallback(async (idParam = id, queryParam = query) => {
    const Service = Feathers.service(path);

    try {
      setId(idParam);
      setQuery(queryParam);
      setLoading(true);
      const response = await Service.get(idParam, { query: queryParam });
      setData(response);
      setError(null);

      return response;
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path, query, id]);

  if(realtime) {
    /**
    |--------------------------------------------------
    | onUpdated
    |--------------------------------------------------
    */
    useEffect(() => {
      const Service = Feathers.service(path);
      function onUpdatedListener(item) {
        if(item._id === data._id) {
          setData(item);
        }
      }
      
      Service.on('updated', onUpdatedListener);
      return () => {
        Service.removeListener('updated', onUpdatedListener);
      };
    }, [data, path]);

    /**
    |--------------------------------------------------
    | onPatched
    |--------------------------------------------------
    */
    useEffect(() => {
      const Service = Feathers.service(path);
      function onPatchedListener(item) {
        if(item._id === data._id) {
          setData({ ...data, ...item });
        }
      }

      Service.on('patched', onPatchedListener);
      return () => {
        Service.removeListener('patched', onPatchedListener);
      };
    }, [data, path]);

    /**
    |--------------------------------------------------
    | onRemoved
    |--------------------------------------------------
    */
    useEffect(() => {
      const Service = Feathers.service(path);
      function onRemovedListener(item) {
        if(item._id === data._id) {
          setData({ ...data, deleted: true });
        }
      }

      Service.on('removed', onRemovedListener);
      return () => {
        Service.removeListener('removed', onRemovedListener);
      };
    }, [data, path]);
  }

  if(!isFunction) {
    useEffect(() => {
      get(id, query);
    }, []);
  }

  if(isFunction) return [get, data, loading, error];
  return [data, loading, error];
};