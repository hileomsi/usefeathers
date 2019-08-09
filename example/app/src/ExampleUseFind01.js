import React from 'react';
import './App.css';

import { useFind } from './useFeathers';

function App() {
  const query = { $sort: { name: 1 } };
  const options = { paginate: true, realtime: true };
  const [{ data }, loading, error, fetchMore] = useFind('users', query, options);

  function handleFetchMore() {
    fetchMore();
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading && <span>Carregando...</span>}
        {!loading && <span>Não carregando...</span>}
        {error && <span>{error}</span>}
        <button onClick={handleFetchMore}>FETCH MORE</button>
        {data && data.map(user => (
          <div key={user._id}>{user.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
