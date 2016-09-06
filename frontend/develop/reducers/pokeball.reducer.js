import types from '../actions/types/pokeball.types';
import {XHR_STATE, reduceRequest} from './common.reducer';


const DEFAULT_STATE = {
	pokemon: {
		isLoading: false,
		types: {}
	},
	pokemons: {
		isLoading: false,
		paginator: {},
		hasMore: false,
		isEmpty: false,
		items: [],
		types: {}
	}
};


export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {

		case types.GET_POKEMON:
			return reduceGetPokemon(state, action);

		case types.GET_POKEMONS:
			return reduceGetPokemons(state, action);
		case types.CLEAR_POKEMONS:
			return reduceClearPokemons(state, action);

		case types.REQUEST_GET_POKEMON:
		case types.REQUEST_GET_POKEMONS:
			return reduceRequest(state, action);

		default:
			return state;
	}
};

function reduceGetPokemon(state, action) {
	debugger
	const { pokemon } = action.payload;
	return {
		...state,
		pokemon
	};
}

function reduceGetPokemons(state, action) {
	debugger
	const { paginator, items } = action.payload;
	const { pokemons } = state;

	return {
		...state,
		pokemons: {
			isLoading: false,
			paginator,
			hasMore: true, // TODO hasMore must be in paginator maybe or calc by paginator
			items: [
				...pokemons.items,
				...items
			]
		}
	};
}

function reduceClearPokemons(state) {
	return {
		...state,
		pokemons: { ...DEFAULT_STATE.pokemons }
	};
}
