import React from 'react';
import './App.css';

import { useRealtime } from './useFeathers';

function App() {
  const [userCreated] = useRealtime('users', 'created', (...args) => {
    console.log('response event => ', ...args);
  });

  console.log('userCreated => ', userCreated);

  return (
    <div className="App">
      <header className="App-header">
        {userCreated && (
          <div>O usuário {userCreated.name} foi criado agorinha</div>
        )}
      </header>
    </div>
  );
}

export default App;
