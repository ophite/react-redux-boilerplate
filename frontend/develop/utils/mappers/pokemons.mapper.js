const getAll = (pokemons) => {
	const data = pokemons.map((pokemon) => ({
		id: pokemon.pkdx_id,
		name: pokemon.name,
		avatar: `http://pokeapi.co/media/img/${pokemon.pkdx_id}.png`,
		types: pokemon.types
	}));
	return data;
};

const getPaginator = (paginator) => {
	const data = {
		limit: paginator.limit,
		next: paginator.next,
		offset: paginator.offset,
		previous: paginator.previous,
		total_count: paginator.total_count
	};
	return data;
};

const getOne = (pokemon) => {
	return {
		id: pokemon.pkdx_id,
		name: pokemon.name,
		avatar: `http://pokeapi.co/media/img/${pokemon.pkdx_id}.png`,
		attack: pokemon.attack,
		defense: pokemon.defense,
		hp: pokemon.hp,
		spAtk: pokemon.sp_atk,
		spDef: pokemon.sp_def,
		speed: pokemon.speed,
		weight: pokemon.weight,
		totalMoves: pokemon.moves.length
	}
};

export default {
	req: {},
	res: {
		getAll,
		getOne,
		getPaginator
	}
};
