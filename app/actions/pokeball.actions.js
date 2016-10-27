import { pokemonModel } from '../models/pokemon.model';
import { pokemonsModel } from '../models/pokemons.model';
import { apiGet } from './common.actions';
import { apiClear } from './api.actions';


export const actionGetPokemons = (params = {}) => {
    return apiGet(
        pokemonsModel,
        params
    );
};
export const actionGetPokemon = (params = {}) => {
    return apiGet(
        pokemonModel,
        params
    );
};

export const actionClearPokemons = () => {
    return apiClear(pokemonsModel);
};
