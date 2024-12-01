import React from 'react';

const PokemonCard = ({ pokemon, onCardClick }) => {
    return (
        <div className="pokemon-card" onClick={() => onCardClick(pokemon)}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>Types: {pokemon.types.join(', ')}</p>
        </div>
    );
};

export default PokemonCard;
