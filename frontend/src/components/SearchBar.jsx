import React from 'react';

const SearchBar = ({ search, setSearch, onSearch }) => {
    return (
        <div className="search">
            <input
                type="text"
                placeholder="Enter Pokémon name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
