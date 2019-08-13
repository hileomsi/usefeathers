import React from 'react';
import './App.css';

import { usePatch } from './useFeathers';

function App() {
  const [patchUser, user, loading, error] = usePatch(() => 'users');

  async function handlePatchUser() {
    const id ='ABK5wkeVtuxFh7Ic';
    const data = { name: 'usePatch 2' };
    const response = await patchUser(id, data);

    console.log('response => ', response);
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handlePatchUser}>PATCH</button>
        {user._id && (
          <span>Usuario atualizado com patch {user.name}.</span>
        )}
      </header>
    </div>
  );
}

export default App;
