import types from '../actions/types/pokeball.types';
import pokemonsModel from '../models/pokemons.model';
import pokemonModel from '../models/pokemon.model';


const DEFAULT_STATE = {
	pokemon: new pokemonModel(),
	pokemons: new pokemonsModel()
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {

		case types.REQUEST_GET_POKEMON:
			return reduceRequestPokemon(state, action);
		case types.GET_POKEMON:
			return reduceGetPokemon(state, action);

		case types.REQUEST_GET_POKEMONS:
			return reduceRequestPokemons(state, action);
		case types.GET_POKEMONS:
			return reduceGetPokemons(state, action);
		case types.CLEAR_POKEMONS:
			return reduceClearPokemons(state, action);

		default:
			return state;
	}
};

const reduceGetPokemon = (state, action) => {
	return {
		...state,
		pokemon: pokemonModel.reduceModel(state.pokemon, action.payload)
	};
};

const reduceRequestPokemon = (state) => {
	return {
		...state,
		pokemon: pokemonModel.reduceModelRequest(state.pokemon)
	};
};

const reduceGetPokemons = (state, action) => {
	return {
		...state,
		pokemons: pokemonsModel.reduceModel(state.pokemons, action.payload)
	};
};

const reduceRequestPokemons = (state) => {
	return {
		...state,
		pokemons: pokemonsModel.reduceModelRequest(state.pokemons)
	};
};

const reduceClearPokemons = (state) => {
	return {
		...state,
		pokemons: new pokemonsModel()
	};
};
