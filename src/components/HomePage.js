import React from 'react';
import { SearchResults } from './SearchBar';  // Make sure to import SearchResults

const HomePage = ({ term, results }) => {  // Receive the props
    return (
        <div className="d-flex flex-column align-items-center justify-content-start vh-100" style={{ paddingTop: '5rem' }}>
            <h1 className='text-white'>Game Talk</h1>
            <p className='text-white'>This is where you can put more information about your app or whatever else you would like.</p>
            <SearchResults term={term} results={results} />
        </div>
    );
}

export default HomePage;
