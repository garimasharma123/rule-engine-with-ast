import React from 'react';
import RuleEngine from './RuleEngine';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Rule Engine with AST</h1>
      </header>
      <RuleEngine />
    </div>
  );
}

export default App;
