import React from 'react';
import './App.css';

import { useAuthenticate, useAuthenticationEvents, useLogout } from './useFeathers';

function App() {
  const [authenticate, dataAuth, authenticated, loading, error] = useAuthenticate();
  const response = useAuthenticationEvents('authenticated', (...args) => {
    console.log('event authenticated => ', args);
  });
  const [logout] = useLogout();

  async function handleLogin() {
    // await authenticate();
    await authenticate({
      strategy: 'local',
      email: 'hileomsi@gmail.com',
      password: '123'
    });
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        {!authenticated && <span>Não autenticado</span>}
        {authenticated && <span>Autenticado</span>}
        {dataAuth && (
          <span>Dados de autenticação</span>
        )}
      </header>
    </div>
  );
}

export default App;
