import React from 'react';
import './App.css';

import { useFind } from './useFeathers';

function App() {
  const query = { $sort: { name: 1 } };
  const [{ data }, loading, error, fetchMore] = useFind('users', query, { paginate: true, realtime: true });

  function handleFetchUsers() {
    fetchMore();
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleFetchUsers}>fetch users</button>
        {data && data.map(user => (
          <div key={user._id}>{user.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
