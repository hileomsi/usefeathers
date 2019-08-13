import { useEffect, useState } from 'react';

import { Feathers } from './useFeathers';

export default (path, event, onSuccess) => {
  const [data, setData] = useState(null);
  useEffect(() => {
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
}