import React from 'react';
import './App.css';

import { useCreate } from './useFeathers';

function App() {
  const [createUser, user, loading, error] = useCreate(() => 'users');

  async function handleCreateUser() {
    const response = await createUser({
      name: 'Estevam',
      email: 'estevam@gmail.com'
    });
    console.log('response => ', response);
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleCreateUser}>Create User</button>
        {user._id && (
          <span>Cadastro do usuario {user.name} realizado com sucesso.</span>
        )}
      </header>
    </div>
  );
}

export default App;
