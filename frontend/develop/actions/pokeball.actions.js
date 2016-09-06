import api from '../api';
import * as actionsCommon from './common.actions';
import typesPokemons from './types/pokeball.types';
import mapperPokemon from '../utils/mappers/pokemons.mapper';


export const actionGetPokemons = (params) => (dispatch) => {
	dispatch(actionsCommon.request(typesPokemons.REQUEST_GET_POKEMONS));

	return api.pokeball
		.getPokemons(params)
		.then(({ meta, objects }) => {
			dispatch(actionsCommon.success(typesPokemons.CLEAR_POKEMONS));

			const items = mapperPokemon.res.getAll(objects);
			const paginator = mapperPokemon.res.getPaginator(meta);

			dispatch(actionsCommon.success(typesPokemons.GET_POKEMONS,
				{ items, paginator }
			));
		})
		.catch(actionsCommon.fail(dispatch));
};

export const actionGetPokemon = (params) => (dispatch) => {
	dispatch(actionsCommon.request(typesPokemons.REQUEST_GET_POKEMON));

	return api.pokeball
		.getPokemon(params)
		.then((data) => {
			const pokemon = mapperPokemon.res.getOne(data);
			dispatch(actionsCommon.success(typesPokemons.GET_POKEMON, { pokemon }));
		})
		.catch(actionsCommon.fail(dispatch));
};

export const actionClearPokemons = () => ({
	type: typesPokemons.CLEAR_POKEMONS
});
