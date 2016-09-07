import model from './model';

class pokemonsModel extends model {

	constructor(props) {
		super(props);
		this.paginator = {};
		this.hasMore = false;
		this.items = [];
	};

	static convertToModel = (res) => {
		const items = res
			.map((pokemon) => ({
				id: pokemon.pkdx_id,
				name: pokemon.name,
				// avatar: `http://pokeapi.co/media/img/${pokemon.pkdx_id}.png`,
				avatar: `https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/sprites/pokemon/model/${pokemon.pkdx_id}.png`,
				types: pokemon.types
			}));

		return items;
	};

	static convertToModelPaginator = (res) => {
		const paginator = {
			limit: res.limit,
			next: res.next,
			offset: res.offset,
			previous: res.previous,
			total_count: res.total_count
		};

		return paginator;
	};

	static combineModel = (items, paginator) => {
		return {
			items, paginator
		};
	};

	static reduceModel = (state, payload) => {
		const { items, paginator } = payload;
		const newState = {
			paginator,
			hasMore: paginator.offset < paginator.total_count,
			items: [
				...state.items,
				...items
			]
		};

		return model.reduceModel(newState);
	};

	static reduceModelRequest = (state) => {
		const newState = model.reduceModelRequest(state);
		return {
			...state,
			isFirstLoading: newState.isLoading && (!newState.items || newState.items.length === 0)
		};
	};
}

export default pokemonsModel;
