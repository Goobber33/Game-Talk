import React, { useState, useCallback } from "react";
import axios from "axios";

const SearchBar = () => {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);

    const search = useCallback(async () => {
        const { data } = await axios.get("http://localhost:5000/api/search", {
            params: { query: term },
        });
        console.log(data); // log the data to console

        // Check if data is an array
        if (data && Array.isArray(data)) {
            setResults(data);
        } else {
            console.log("Unexpected data:", data);
        }
    }, [term]);

    const renderedResults = results.map((result, index) => {
        return (
            <div key={index} className="list-group-item">
                <h4 className="list-group-item-heading">{result.TERM}</h4>
                <p className="list-group-item-text">{result.DEFINITION}</p>
                {/* add here more fields as needed */}
            </div>
        );
    });

    return (
        <div className="container mt-4">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter search term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={search}>
                        Search
                    </button>
                </div>
            </div>
            <div className="list-group">{renderedResults}</div>
        </div>
    );
};

export default SearchBar;
