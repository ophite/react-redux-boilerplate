import types from '../actions/types/pokeball.types';
import pokemonsModel from '../models/pokemons.model';

const DEFAULT_STATE = {
	pokemon: {
		isLoading: false,
		types: {}
	},
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

function reduceGetPokemon(state, action) {
	const { pokemon } = action.payload;
	return {
		...state,
		pokemon
	};
}

function reduceRequestPokemon(state) {
	const { pokemon } = state;
	return {
		...state,
		pokemon: {
			...pokemon,
			isLoading: true
		}
	};
}

function reduceGetPokemons(state, action) {
	const { pokemons } = state;
	return {
		...state,
		pokemons: pokemonsModel.reduceModel(pokemons, action.payload)
	};
}

function reduceRequestPokemons(state) {
	const { pokemons } = state;
	return {
		...state,
		pokemons: {
			...pokemons,
			isLoading: true
		}
	};
}

function reduceClearPokemons(state) {
	return {
		...state,
		pokemons: { ...DEFAULT_STATE.pokemons }
	};
}
