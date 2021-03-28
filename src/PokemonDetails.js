import React from 'react';

function PokemonDetails({data, setView}) {
    const goBack = () => {
        setView("");
    }

    return (
        <>
            <h1>{data.name}</h1>

            <img src={data.sprites.front_default} alt=""/>

            <h2>Types:</h2>
            {
                data.types.map((t,i) => (
                    <p key={i}>{t.type.name}</p>
                ))
            }

            <h2>Abilities:</h2>
            {
                data.abilities.map((a,i) => (
                    <p key={i}>{a.ability.name}</p>
                ))
            }

            <h2>Moves:</h2>
            {
                data.moves.splice(0,5).map((m,i) => (
                    <p key={i}>{m.move.name}</p>
                ))
            }

            <button onClick={goBack}>Back</button>
        </>
    )
}

export default PokemonDetails;