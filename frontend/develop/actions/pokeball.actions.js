import api from '../api';
import * as actionsCommon from './common.actions';
import typesPokemons from './types/pokeball.types';
import pokemonsModel from '../models/pokemons.model';
import pokemonModel from '../models/pokemon.model';


export const actionGetPokemons = (params) => (dispatch) => {
	dispatch(actionsCommon.request(typesPokemons.REQUEST_GET_POKEMONS));

	return api.pokeball
		.getPokemons(params)
		.then(({ meta, objects }) => {
			// dispatch(actionsCommon.success(typesPokemons.CLEAR_POKEMONS));

			const items = pokemonsModel.convertToModel(objects);
			const paginator = pokemonsModel.convertToModelPaginator(meta);

			dispatch(actionsCommon.success(typesPokemons.GET_POKEMONS,
				pokemonsModel.combineModel(items, paginator)
			));
		})
		.catch(actionsCommon.fail(dispatch));
};

export const actionGetPokemon = (params) => (dispatch) => {
	dispatch(actionsCommon.request(typesPokemons.REQUEST_GET_POKEMON));

	return api.pokeball
		.getPokemon(params)
		.then((data) => {
			const pokemon = pokemonModel.convertToModel(data);
			dispatch(actionsCommon.success(typesPokemons.GET_POKEMON,
				pokemonModel.combineModel(pokemon)
			));
		})
		.catch(actionsCommon.fail(dispatch));
};

export const actionClearPokemons = () => ({
	type: typesPokemons.CLEAR_POKEMONS
});
