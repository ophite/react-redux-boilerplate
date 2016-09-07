class pokemonsModel {

	constructor() {
		this.isLoading = false;
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
		return {
			isLoading: false,
			paginator,
			hasMore: true, // TODO hasMore must be in paginator maybe or calc by paginator
			items: [
				...state.items,
				...items
			]
		}
	};

	static reduceModelRequest = (state) => {
		return {
			...state,
			isLoading: true
		}
	};
}

export default pokemonsModel;
