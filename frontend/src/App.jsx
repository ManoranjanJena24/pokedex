import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/pokemon/${search.toLowerCase()}`);
            setPokemon(response.data);
        } catch {
            setPokemon(null);
            alert('Pokemon not found!');
        }
    };

    return (
        <div className="app">
            <h1>Pokedex</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Enter Pokemon name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {pokemon && (
                <div className="pokemon-card">
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprite} alt={pokemon.name} />
                    <p>Types: {pokemon.types.join(', ')}</p>
                    <p>Abilities: {pokemon.abilities.join(', ')}</p>
                    <h3>Stats:</h3>
                    <ul>
                        {pokemon.stats.map((stat) => (
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
