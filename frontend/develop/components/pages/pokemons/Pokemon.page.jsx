import React, {Component, PropTypes} from 'react';
import PokemonExt from '../../pokemons/PokemonExt.jsx';


class PokemonPage extends Component {

	renderPokemonCard(pokemon) {
		if (pokemon.isLoading) {
			return (
				<div>
					<p>Loading...</p>
				</div>
			);
		}

		return (
			<PokemonExt pokemon={pokemon}/>
		);
	}

	render() {
		const { pokemon } = this.props;
		return (
			<div>
				{this.renderPokemonCard(pokemon)}
			</div>
		);
	}
}

PokemonPage.propTypes = {
	pokemon: PropTypes.object
};

export default PokemonPage;
