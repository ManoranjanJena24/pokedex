import React from 'react';
import './PokemonDetails.css';

const PokemonDetails = ({ pokemon, onBackClick }) => {
    return (
        <div className="pokemon-card-details">
            <button onClick={onBackClick}>Back to Pokedex</button>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>Types: {pokemon.types.join(', ')}</p>
        </div>
    );
};

export default PokemonDetails;
