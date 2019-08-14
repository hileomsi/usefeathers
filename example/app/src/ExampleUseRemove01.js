import React from 'react';
import './App.css';

import { useRemove } from './useFeathers';

function App() {
  const [user, loading, error] = useRemove('users', 'DIh3Wtr3nA72Twqs');

  console.log('user => ', user);

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        {user && (
          <span>Usuario removido. {user.name}.</span>
        )}
      </header>
    </div>
  );
}

export default App;
