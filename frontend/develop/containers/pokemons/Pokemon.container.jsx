import React, {Component, PropTypes} from 'react';
import PokemonPage from '../../components/pages/pokemons/Pokemon.page.jsx';


class PokemonContainer extends Component {

	componentDidMount() {
		const { params, handleActionGetPokemon } = this.props;
		handleActionGetPokemon({ pokemonId: params.pokemonId });
	}

	render() {
		const { pokemon } = this.props;

		return (
			<PokemonPage
				pokemon={pokemon}
			/>
		);
	}
}

export default PokemonContainer;
