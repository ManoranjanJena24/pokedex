import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './App.css';

const App = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [allPokemon, setAllPokemon] = useState([]);

    useEffect(() => {
        const fetchInitialPokemon = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                const pokemonData = response.data.results;

                const pokemonDetails = await Promise.all(
                    pokemonData.map(async (pokemon) => {
                        const detailsResponse = await axios.get(pokemon.url);
                        const details = detailsResponse.data;
                        return {
                            name: details.name,
                            sprite: details.sprites.front_default,
                            types: details.types.map(type => type.type.name),
                        };
                    })
                );

                setAllPokemon(pokemonDetails);
                setResults(pokemonDetails);
            } catch (error) {
                console.error('Error fetching initial Pokémon data:', error.message);
            }
        };

        fetchInitialPokemon();
    }, []);

    const handleSearch = async () => {
        if (!search.trim()) {
            setResults(allPokemon);
            return;
        }

        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302');
            const allPokemonData = response.data.results;

            const filteredResults = allPokemonData
                .filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))
                .map(async (pokemon) => {
                    const detailsResponse = await axios.get(pokemon.url);
                    const details = detailsResponse.data;
                    return {
                        name: details.name,
                        sprite: details.sprites.front_default,
                        types: details.types.map(type => type.type.name),
                    };
                });

            const resultsData = await Promise.all(filteredResults);
            setResults(resultsData);
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
    };

    const handleCardClick = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleBackClick = () => {
        setSelectedPokemon(null);
    };

    return (
        <div className="app">
            {selectedPokemon === null ? (
                <>
                    <h1>Pokedex</h1>
                    <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
                    <PokemonList results={results} onCardClick={handleCardClick} />
                </>
            ) : (
                <PokemonDetails pokemon={selectedPokemon} onBackClick={handleBackClick} />
            )}
        </div>
    );
};

export default App;
