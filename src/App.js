import React, { useState } from 'react';
import './styles/App.css';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="App-background">
        <NavBar term={term} setTerm={setTerm} setResults={setResults} />
        <header className="App-header">
          <HomePage term={term} results={results} />
        </header>
      </div>
    </div>
  );
}

export default App;
