import React from 'react';
import './App.css';

import { useGet } from './useFeathers';

function App() {
  const options = { realtime: true };
  const [getUser, user, loading, error] = useGet(() => 'users', options);

  async function handleGetUser() {
    const id = 'ABK5wkeVtuxFh7Ic';
    const response = await getUser(id); 

    console.log('response => ', response);
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleGetUser}>GET</button>
        <div>{user.email}</div>
        <div>{user.name}</div>
      </header>
    </div>
  );
}

export default App;
