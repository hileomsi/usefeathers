import React from 'react';
import './App.css';

import { useCreate } from './useFeathers';

function App() {
  const [user, loading, error] = useCreate('users', {
    name: 'useCreate',
    email: 'useCreate@gmail.com'
  });

  console.log('user => ', user);

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        {user._id && (
          <span>Cadastro do usuario {user.name} realizado com sucesso.</span>
        )}
      </header>
    </div>
  );
}

export default App;
