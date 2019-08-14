import React from 'react';
import './App.css';

import { useUpdate } from './useFeathers';

function App() {
  const [updateUser, user, loading, error] = useUpdate(() => 'users');

  async function handleUpdateUser() {
    const id ='ABK5wkeVtuxFh7Ic';
    const data = {
      name: 'useUpdate 2',
      email: 'useUpdate2@gmail.com'
    };
    const response = await updateUser(id, data);

    console.log('response => ', response);
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleUpdateUser}>UPDATE</button>
        {user && (
          <span>Usuario atualizado com update {user.name}.</span>
        )}
      </header>
    </div>
  );
}

export default App;
