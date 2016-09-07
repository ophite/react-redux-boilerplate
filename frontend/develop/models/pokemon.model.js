import model from './model';


class pokemonModel extends model {

	constructor(props) {
		super(props);
		this.types = [];
	};

	static convertToModel = (res) => {
		const item = {
			id: res.pkdx_id,
			name: res.name,
			// avatar: `http://pokeapi.co/media/img/${res.pkdx_id}.png`,
			avatar: `https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/sprites/pokemon/model/${res.pkdx_id}.png`,
			attack: res.attack,
			defense: res.defense,
			hp: res.hp,
			spAtk: res.sp_atk,
			spDef: res.sp_def,
			speed: res.speed,
			weight: res.weight,
			totalMoves: res.moves.length
		};

		return item;
	};

	static combineModel = (item) => {
		return {
			item
		};
	};

	static reduceModel = (state, payload) => {
		const { item } = payload;
		const newState = { ...item };
		return model.reduceModel(newState);
	};
}

export default pokemonModel;
