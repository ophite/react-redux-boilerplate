import React, {Component, PropTypes} from 'react';
import PokemonExt from '../../pokemons/PokemonExt.jsx';


class PokemonPage extends Component {

	renderPokemonCard(pokemon) {
		return (
			<PokemonExt pokemon={pokemon}/>
		);
	}

	render() {
		const { pokemon } = this.props;

		return (
			<div className="row">
				{
					pokemon.isLoading ?
						(
							<div className="col-xs-12 col-sm-12 col-md-12">
								<p className="text-center">Loading...</p>
							</div>
						)
						: (this.renderPokemonCard(pokemon))
				}
			</div>
		);
	}
}

PokemonPage.propTypes = {
	pokemon: PropTypes.object
};

export default PokemonPage;
