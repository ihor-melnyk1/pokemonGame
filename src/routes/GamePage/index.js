import {useState,useEffect,useContext} from 'react';
import {useRouteMatch,Route,Switch} from "react-router-dom";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import { PokemonContext } from "../../context/pokemonContext";


const GamePage = () => {
  const [pokemons,setPokemons]=useState({});
  const [enemy,setEnemy]=useState({});
  const handleAddPokemon= (key,pokemon)=>{
    setPokemons(prevState=>{
      if(prevState[key]){
        const copyState={...prevState};
        delete copyState[key];
        return copyState;
      }
      return{
        ...prevState,
        [key]:pokemon,
      }
    })
  }
  const handleAddEnemies =(data)=>{
    setEnemy(data);
  }
  const handleClearEnemies= ()=>{
    setEnemy({});
  }
  const match = useRouteMatch();
  return (
      <PokemonContext.Provider value={{pokemons:pokemons,addPokemon:handleAddPokemon,enemies:enemy,addEnemies:handleAddEnemies,clearEnemies:handleClearEnemies}}>
      <Switch>
          <Route path={`${match.path}/`} exact component={StartPage} />
          <Route path={`${match.path}/board`} component={BoardPage} />
          <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
      </PokemonContext.Provider>
  );
}

export default GamePage