import React from 'react';
import './App.css';

import { useUpdate } from './useFeathers';

function App() {
  const [user, loading, error] = useUpdate('users', 'ABK5wkeVtuxFh7Ic', {
    name: 'useUpdate',
    email: 'useUpdate@gmail.com'
  });

  console.log('user => ', user);

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        {user && (
          <span>Usuario atualizado com update {user.name}.</span>
        )}
      </header>
    </div>
  );
}

export default App;
