import { useEffect, useState } from 'react';

import { Feathers } from './useFeathers';

const events = [
  'authenticated',
  'logout',
  'reauthentication-error'
];

export default (event, onSuccess) => {
  if(!events.includes(event)) throw new Error('event not support.');

  const [response, setResponse] = useState(null);
  useEffect(() => {
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
}