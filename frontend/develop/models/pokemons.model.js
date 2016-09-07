class pokemonsModel {

	constructor() {
		this.isLoading = false;
		this.paginator = {};
		this.hasMore = false;
		this.isEmpty = false;
		this.items = [];
		this.types = {};
	};

	static convertToModel = (pokemons) => {
		const items = pokemons
			.map((pokemon) => ({
				id: pokemon.pkdx_id,
				name: pokemon.name,
				avatar: `http://pokeapi.co/media/img/${pokemon.pkdx_id}.png`,
				types: pokemon.types
			}));
		return items;
	};

	static convertToModelPaginator = (paginator) => {
		const data = {
			limit: paginator.limit,
			next: paginator.next,
			offset: paginator.offset,
			previous: paginator.previous,
			total_count: paginator.total_count
		};
		return data;
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
}

export default pokemonsModel;
