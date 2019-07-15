import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import Home from './containers/Home';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Micromania Stores</h1>
        </header>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
