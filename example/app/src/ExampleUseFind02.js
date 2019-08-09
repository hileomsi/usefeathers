import React from 'react';
import './App.css';

import { useFind } from './useFeathers';

function App() {
  const options = { paginate: true, realtime: true };
  const [fetchUsers, { data }, loading, error, fetchMore] = useFind(() => 'users', options);

  function handleFetchMore() {
    fetchMore();
  }

  async function handleFetch() {
    const query = { $sort: { name: 1 } };
    const response = await fetchUsers(query);
    console.log('users => ', response)
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleFetch}>FETCH</button>
        <button onClick={handleFetchMore}>FETCH MORE</button>
        {data && data.map(user => (
          <div key={user._id}>{user.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
