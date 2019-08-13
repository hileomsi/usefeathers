import { defaultOptions } from './constants';

export function findAndUpdateItem(items, item){
  const itemIndex = items.findIndex(i => i._id === item._id);

  if(itemIndex !== -1) {
    items.splice(itemIndex, 1, {
      ...items[itemIndex],
      ...item
    });
  }

  return items;
};

export function findAndRemoveItem(items, item) {
  return items.filter(i => i._id !== item._id);
};

export function destructuringFindParams(...args) {
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

export function destructuringGetParams(...args) {
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

export function destructuringCreateParams(...args) {
  let path;
  let data = {};
  let query;
  const isFunction = typeof args[0] === 'function';

  console.log(args);

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
};