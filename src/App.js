import { useEffect, useState } from 'react';
import Pokemon from './Pokemon';
import './App.css';
import PokemonDetails from './PokemonDetails';

function App() {

  const mainUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

  const [pokemon, setPokemon] = useState({});
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [view, setView] = useState("");
  const [clicked, setClicked] = useState([]);

  useEffect(() => {

    loadPokemonData(mainUrl);
    
  }, []);

  const loadPokemonData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    let detailsData = await Promise.all(
      data.results.map(p => {

      let details =
        new Promise((resolve) => {
        fetch(p.url)
        .then(responseDetails => responseDetails.json())
        .then(data => {
            resolve(data);
        });
      });

      return details;

    }));
    

    setPokemonDetails(detailsData);

  }

  const detailedView = (selectedPokemon) => {
    setPokemon(selectedPokemon);
    setView("detailed");
    setClicked((prevPokemon) => {
      if (clicked.indexOf(selectedPokemon.id) > -1) {
        return [...prevPokemon];
      }
      return [...prevPokemon, selectedPokemon.id];
    });
  }

  switch (view) {
    case "detailed":
      return (
        <div className="App">
          <PokemonDetails setView={setView} data={pokemon} />
        </div>
      )
  
    default:
      return (
        <div className="App">
          {
            pokemonDetails.map((p,i) => (
              <Pokemon key={i} pokemon={p} detailedView={detailedView} imgSrc={clicked.indexOf(p.id) > -1 ? p.sprites.front_default : "#"}/>
            ))
          }
        </div>
      )
  }
}

export default App;
