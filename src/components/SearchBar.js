import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Splitting the SearchBar component into two separate components: 
// One for the actual search bar (`SearchInput`) and one for the search results (`SearchResults`).

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
    // Find the main definition based on the search term
    const mainDefinition = results.find((result) => {
        return result.TERM.toLowerCase() === term.toLowerCase();
    });

    // Sort results to have the main definition on top
    const sortedResults = [...results].sort((a, b) => {
        if (a.TERM.toLowerCase() === term.toLowerCase()) return -1;
        if (b.TERM.toLowerCase() === term.toLowerCase()) return 1;
        return 0;
    });

    // Render the sorted results
    return (
        <div className="d-flex justify-content-center">
            <div className="list-group" style={{ width: '50rem' }}>
                {sortedResults.map((result, index) => (
                    <div key={index} className="list-group-item">
                        {mainDefinition && mainDefinition.TERM === result.TERM
                            ? <h4 className="list-group-item-heading">{result.TERM}</h4>
                            : <h4 className="list-group-item-heading">{result.TERM}</h4>}
                        <p className="list-group-item-text">{result.DEFINITION}</p>
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
            setResults(data);  // Pass results up
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
