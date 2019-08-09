import React from 'react';
import './App.css';

import { useGet } from './useFeathers';

function App() {
  const query = {};
  const options = { realtime: true };
  const [user, loading, error] = useGet('users', 'ABK5wkeVtuxFh7Ic', query, options);

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <div>{user.email}</div>
        <div>{user.name}</div>
      </header>
    </div>
  );
}

export default App;
