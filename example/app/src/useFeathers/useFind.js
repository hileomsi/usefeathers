import { useState, useEffect, useCallback } from 'react';

import { findAndUpdateItem, findAndRemoveItem, destructuringFindParams } from './helpers';
import { Feathers } from './useFeathers';

const defaultDataPaginate = {
  data: [],
  total: 0,
  limit: 0,
  skip: 0
};

const defaultData = [];

const getDefaultData = ({ paginate }) => paginate ? defaultDataPaginate : defaultData;

export default (...args) => {
  const { path, query: queryTemp, options, isFunction } = destructuringFindParams(...args);
  const { paginate, realtime } = options;
  const [query, setQuery] = useState(queryTemp);
  const [data, setData] = useState(getDefaultData(options));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
  |--------------------------------------------------
  | find
  |--------------------------------------------------
  */
  const find = useCallback(async (queryParam = query) => {
    const Service = Feathers.service(path);

    try {
      setQuery(queryParam || query);
      setLoading(true);
      const response = await Service.find({ query: queryParam });
      setData(response);
      setError(null);

      return response;
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path, query]);

  /**
  |--------------------------------------------------
  | fetchMore
  |--------------------------------------------------
  */
  const fetchMore = useCallback(async () => {
    const Service = Feathers.service(path);
    const queryPaginate = {
      $limit: data.limit,
      $skip: data.data.length,
      ...query
    };

    try {
      setLoading(true);
      const response = await Service.find({ query: queryPaginate });
      const newData = {
        ...data,
        data: [...data.data, ...response.data]
      };
      setData(newData);
      setError(null);

      return response;
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [data, path, query]);

  if(realtime) {
    /**
    |--------------------------------------------------
    | onCreated
    |--------------------------------------------------
    */
    useEffect(() => {
      const Service = Feathers.service(path);
      function onCreatedListener(item) {
        const items = paginate ? data.data : data; 
        const newData = [...items, item];
        setData(paginate ? { ...data, data: newData } : newData);
      }
      Service.on('created', onCreatedListener);
      return () => {
        Service.removeListener('created', onCreatedListener);
      };
    }, [data, paginate, path]);

    /**
    |--------------------------------------------------
    | onUpdated
    |--------------------------------------------------
    */
    useEffect(() => {
      const Service = Feathers.service(path);
      function onUpdatedListener(item) {
        const items = paginate ? data.data : data; 
        const newData = findAndUpdateItem(items, item);
        setData(paginate ? { ...data, data: newData } : newData);
      }
      
      Service.on('updated', onUpdatedListener);
      return () => {
        Service.removeListener('updated', onUpdatedListener);
      };
    }, [data, paginate, path]);

    /**
    |--------------------------------------------------
    | onPatched
    |--------------------------------------------------
    */
    useEffect(() => {
      const Service = Feathers.service(path);
      function onPatchedListener(item) {
        const items = paginate ? data.data : data; 
        const newData = findAndUpdateItem(items, item);
        setData(paginate ? { ...data, data: newData } : newData);
      }

      Service.on('patched', onPatchedListener);
      return () => {
        Service.removeListener('patched', onPatchedListener);
      };
    }, [data, paginate, path]);

    /**
    |--------------------------------------------------
    | onRemoved
    |--------------------------------------------------
    */
    useEffect(() => {
      const Service = Feathers.service(path);
      function onRemovedListener(item) {
        const items = paginate ? data.data : data; 
        const newData = findAndRemoveItem(items, item);
        setData(paginate ? { ...data, data: newData } : newData);
      }

      Service.on('removed', onRemovedListener);
      return () => {
        Service.removeListener('removed', onRemovedListener);
      };
    }, [data, paginate, path]);
  }

  if(!isFunction) {
    useEffect(() => {
      find(query);
    }, []);
  }

  if(isFunction && paginate) return [find, data, loading, error, fetchMore];
  if(isFunction) return [find, data, loading, error];
  if(paginate) return [data, loading, error, fetchMore];
  return [data, loading, error];
};