import React from 'react';

function Pokemon({pokemon, detailedView, imgSrc}) {

    const getPokemon = () => {
        detailedView(pokemon);
    }

    return (
        <>
            <img src={imgSrc} alt=""/>
            <button onClick={getPokemon}>{pokemon.name}</button>
        </>
    );
}

export default Pokemon;