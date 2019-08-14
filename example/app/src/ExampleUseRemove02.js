import React from 'react';
import './App.css';

import { useRemove } from './useFeathers';

function App() {
  const [removeUser, user, loading, error] = useRemove(() => 'users');

  async function handleRemoveUser() {
    const response = await removeUser('FQy32OAzJpckPmPd'); 
    console.log('response => ', response);
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleRemoveUser}>REMOVE</button>
        {user && (
          <span>Usuario removido. {user.name}.</span>
        )}
      </header>
    </div>
  );
}

export default App;
