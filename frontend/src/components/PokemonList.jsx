import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ results, onCardClick }) => {
    return (
        <div className="results">
            <div className="card-grid">
                {results.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        pokemon={pokemon}
                        onCardClick={onCardClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
