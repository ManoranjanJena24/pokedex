import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handleSearch = async () => {
        if (!search.trim()) {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/pokemon?search=${encodeURIComponent(search)}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
    };

    return (
        <div className="app">
            <h1>Pokedex</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Enter Pokémon name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="results">
                <div className="card-grid">
                    {results.map((pokemon, index) => (
                        <div
                            key={index}
                            className="pokemon-card"
                            onClick={() => setSelectedPokemon(pokemon)}
                        >
                            <h2>{pokemon.name}</h2>
                            <img src={pokemon.sprite} alt={pokemon.name} />
                            <p>Types: {pokemon.types.join(', ')}</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPokemon && (
                <div className="pokemon-card-details">
                    <h2>{selectedPokemon.name}</h2>
                    <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
                    <p>Types: {selectedPokemon.types.join(', ')}</p>
                    <p>Abilities: {selectedPokemon.abilities.join(', ')}</p>
                    <h3>Stats:</h3>
                    <ul>
                        {selectedPokemon.stats.map((stat) => (
                            <li key={stat.name}>
                                {stat.name}: {stat.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
