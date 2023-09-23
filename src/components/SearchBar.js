import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '../styles/SearchResults.css';
import 'font-awesome/css/font-awesome.min.css';

const speakDefinition = (definition) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = definition;
  
    // Get list of available voices
    const voices = window.speechSynthesis.getVoices();
  
    // Find a specific voice by name or language
    const selectedVoice = voices.find(voice => voice.name === 'Google UK English Female'); // Replace with your preferred voice name
  
    // Use the voice if available
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }
  
    window.speechSynthesis.speak(speech);
  };

const SearchInput = ({ onSearch, term, setTerm }) => {
  return (
    <div className="input-group" style={{ width: '40rem' }}>
      <input
        type="text"
        className="form-control"
        placeholder="Enter search term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

const SearchResults = ({ results, term }) => {
  const mainDefinition = results.find((result) => {
    return result.TERM.toLowerCase() === term.toLowerCase();
  });

  const sortedResults = [...results].sort((a, b) => {
    if (a.TERM.toLowerCase() === term.toLowerCase()) return -1;
    if (b.TERM.toLowerCase() === term.toLowerCase()) return 1;
    return 0;
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="list-group" style={{ width: '50rem' }}>
        {sortedResults.map((result, index) => (
          <div key={index} className="list-group-item">
            <div className="result-content">
              <h4 className="list-group-item-heading">{result.TERM}</h4>
              <p className="list-group-item-text">{result.DEFINITION}</p>
            </div>
            <i 
              className="fa fa-bullhorn megaphone-icon" 
              onClick={() => speakDefinition(result.DEFINITION)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchBar = ({ setResults }) => {
  const [term, setTerm] = useState("");
  
  const search = useCallback(async () => {
    const { data } = await axios.get("http://localhost:5000/api/search", {
      params: { query: term },
    });
    
    if (data && Array.isArray(data)) {
      setResults(data);
    } else {
      console.log("Unexpected data:", data);
    }
  }, [term, setResults]);
  
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-3">
        <SearchInput onSearch={search} term={term} setTerm={setTerm} />
      </div>
    </div>
  );
};

export default SearchBar;
export { SearchInput, SearchResults };
