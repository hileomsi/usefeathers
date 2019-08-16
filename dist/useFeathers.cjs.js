'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

let Feathers;

var useFeathers = instanceFeathers => {
  Feathers = instanceFeathers;
};

const defaultOptions = {
  paginate: false,
  realtime: false
};

function findAndUpdateItem(items, item){
  const itemIndex = items.findIndex(i => i._id === item._id);

  if(itemIndex !== -1) {
    items.splice(itemIndex, 1, {
      ...items[itemIndex],
      ...item
    });
  }

  return items;
}
function findAndRemoveItem(items, item) {
  return items.filter(i => i._id !== item._id);
}
function destructuringFindParams(...args) {
  let path;
  let query;
  let options = defaultOptions;
  const isFunction = typeof args[0] === 'function';
  
  if(isFunction) {
    const [getPath, optionsParam] = args;
    path = getPath();
    options = optionsParam;
  } else {
    const [pathParam, queryParam, optionsParam] = args;
    path = pathParam;
    query = queryParam;
    options = optionsParam;
  }

  return { path, query, options, isFunction };
}

function destructuringGetParams(...args) {
  let id;
  let path;
  let query;
  let options = defaultOptions;
  const isFunction = typeof args[0] === 'function';

  if(isFunction) {
    const [getPath, optionsParam] = args;
    path = getPath();
    options = optionsParam;
  } else {
    const [pathParam, idParam, queryParam, optionsParam] = args;
    id = idParam;
    path = pathParam;
    query = queryParam;
    options = optionsParam;
  }

  return { path, id, query, options, isFunction };
}

function destructuringCreateParams(...args) {
  let path;
  let data;
  let query;
  const isFunction = typeof args[0] === 'function';

  if(isFunction) {
    const [getPath] = args;
    path = getPath();
  } else {
    const [pathParam, dataParam, queryParam] = args;
    path = pathParam;
    data = dataParam || data;
    query = queryParam;
  }

  return { path, data, query, isFunction };
}
function destructuringPatchAndUpdateParams(...args) {
  let id;
  let path;
  let data;
  let query;
  const isFunction = typeof args[0] === 'function';

  if(isFunction) {
    const [getPath] = args;
    path = getPath();
  } else {
    const [pathParam, idParam, dataParam, queryParam] = args;
    id = idParam;
    path = pathParam;
    data = dataParam || data;
    query = queryParam;
  }

  return { path, id, data, query, isFunction };
}
function destructuringRemoveParams(...args) {
  let id;
  let path;
  let query;
  const isFunction = typeof args[0] === 'function';

  if(isFunction) {
    const [getPath] = args;
    path = getPath();
  } else {
    const [pathParam, idParam, queryParam] = args;
    id = idParam;
    path = pathParam;
    query = queryParam;
  }

  return { id, path, query, isFunction };
}

const defaultDataPaginate = {
  data: [],
  total: 0,
  limit: 0,
  skip: 0
};

const defaultData = [];

const getDefaultData = ({ paginate }) => paginate ? defaultDataPaginate : defaultData;

var useFind = (...args) => {
  const { path, query: queryTemp, options, isFunction } = destructuringFindParams(...args);
  const { paginate, realtime } = options;
  const [query, setQuery] = react.useState(queryTemp);
  const [data, setData] = react.useState(getDefaultData(options));
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);

  /**
  |--------------------------------------------------
  | find
  |--------------------------------------------------
  */
  const find = react.useCallback(async (queryParam = query) => {
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
  const fetchMore = react.useCallback(async () => {
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
    react.useEffect(() => {
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
    react.useEffect(() => {
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
    react.useEffect(() => {
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
    react.useEffect(() => {
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
    react.useEffect(() => {
      find(query);
    }, []);
  }

  if(isFunction && paginate) return [find, data, loading, error, fetchMore];
  if(isFunction) return [find, data, loading, error];
  if(paginate) return [data, loading, error, fetchMore];
  return [data, loading, error];
};

var useGet = (...args) => {
  const { path, id: idTemp, query: queryTemp, options, isFunction } = destructuringGetParams(...args);
  const { realtime } = options;
  const [id, setId] = react.useState(idTemp);
  const [query, setQuery] = react.useState(queryTemp);
  const [data, setData] = react.useState(null);
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);

  /**
  |--------------------------------------------------
  | get
  |--------------------------------------------------
  */
  const get = react.useCallback(async (idParam = id, queryParam = query) => {
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
    react.useEffect(() => {
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
    react.useEffect(() => {
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
    react.useEffect(() => {
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
    react.useEffect(() => {
      get(id, query);
    }, []);
  }

  if(isFunction) return [get, data, loading, error];
  return [data, loading, error];
};

var useCreate = (...args) => {
  const { path, data: dataDefault, query: queryDefault, isFunction } = destructuringCreateParams(...args);
  const [query, setQuery] = react.useState(queryDefault);
  const [data, setData] = react.useState(dataDefault);
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);

  /**
  |--------------------------------------------------
  | create
  |--------------------------------------------------
  */
  const create = react.useCallback(async (dataParam = data, queryParam = query) => {
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
    react.useEffect(() => {
      create(data, query);
    }, []);
  }

  if(isFunction) return [create, data, loading, error];
  return [data, loading, error];
};

var usePatch = (...args) => {
  const { path, id: idDefault, data: dataDefault, query: queryDefault, isFunction } = destructuringPatchAndUpdateParams(...args);
  const [id] = react.useState(idDefault);
  const [query, setQuery] = react.useState(queryDefault);
  const [data, setData] = react.useState(dataDefault);
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);

  /**
  |--------------------------------------------------
  | patch
  |--------------------------------------------------
  */
  const patch = react.useCallback(async (idParam, dataParam, queryParam) => {
    const Service = Feathers.service(path);

    try {
      setQuery(queryParam);
      setLoading(true);
      const response = await Service.patch(idParam, dataParam, { query: queryParam });
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
    react.useEffect(() => {
      patch(id, data, query);
    }, []);
  }

  if(isFunction) return [patch, data, loading, error];
  return [data, loading, error];
};

var useUpdate = (...args) => {
  const { path, id: idDefault, data: dataDefault, query: queryDefault, isFunction } = destructuringPatchAndUpdateParams(...args);
  const [id] = react.useState(idDefault);
  const [query, setQuery] = react.useState(queryDefault);
  const [data, setData] = react.useState(dataDefault);
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);

  /**
  |--------------------------------------------------
  | update
  |--------------------------------------------------
  */
  const update = react.useCallback(async (idParam, dataParam, queryParam) => {
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
    react.useEffect(() => {
      update(id, data, query);
    }, []);
  }

  if(isFunction) return [update, data, loading, error];
  return [data, loading, error];
};

var useRemove = (...args) => {
  const { path, id: idDefault, query: queryDefault, isFunction } = destructuringRemoveParams(...args);
  const [id] = react.useState(idDefault);
  const [query, setQuery] = react.useState(queryDefault);
  const [data, setData] = react.useState(null);
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);

  /**
  |--------------------------------------------------
  | remove
  |--------------------------------------------------
  */
  const remove = react.useCallback(async (idParam, queryParam) => {
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
    react.useEffect(() => {
      remove(id, data, query);
    }, []);
  }

  if(isFunction) return [remove, data, loading, error];
  return [data, loading, error];
};

var useRealtime = (path, event, onSuccess) => {
  const [data, setData] = react.useState(null);
  react.useEffect(() => {
    const Service = Feathers.service(path);
    
    function onEvent(...args) {
      if(onSuccess && typeof onSuccess === 'function') {
        onSuccess(...args);
      }

      setData(args[0]);
    }

    Service.on(event, onEvent);
    return () => {
      Service.removeListener(event, onEvent);
    }
  }, [path, event, onSuccess]);

  return [data];
};

var useLogout = () => {
  const logout = react.useCallback(() => {
    return Feathers.logout();
  }, []);

  return [logout];
};

var useAuthenticate = () => {
  const [authenticated, setAuthenticated] = react.useState(false);
  const [loading, setLoading] = react.useState(false);
  const [response, setResponse] = react.useState(null);
  const [error, setError] = react.useState(null);

  /**
  |--------------------------------------------------
  | authenticate
  |--------------------------------------------------
  */
  const authenticate = react.useCallback(async data => {
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

const events = [
  'authenticated',
  'logout',
  'reauthentication-error'
];

var useAuthenticationEvents = (event, onSuccess) => {
  if(!events.includes(event)) throw new Error('event not support.');

  const [response, setResponse] = react.useState(null);
  react.useEffect(() => {
    function onEvent(...args) {
      if(onSuccess && typeof onSuccess === 'function') {
        onSuccess(...args);
      }

      setResponse(args);
    }

    Feathers.on(event, onEvent);
    return () => {
      Feathers.removeListener(event, onEvent);
    }
  }, [event, onSuccess]);

  return response;
};

exports.default = useFeathers;
exports.useAuthenticate = useAuthenticate;
exports.useAuthenticationEvents = useAuthenticationEvents;
exports.useCreate = useCreate;
exports.useFind = useFind;
exports.useGet = useGet;
exports.useLogout = useLogout;
exports.usePatch = usePatch;
exports.useRealtime = useRealtime;
exports.useRemove = useRemove;
exports.useUpdate = useUpdate;
