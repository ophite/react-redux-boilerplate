import React, {Component, PropTypes} from 'react'; // TODO move to define plugin
import {Link} from 'react-router';

import routes from '../../constants/routes.constant';


class Pokemon extends Component {

	renderPokemonTypes(types) {
		return types
			.map(type => {
					return (
						<span key={type.name}>
							{type.name}
						</span>
					);
				}
			);
	}

	render() {
		const { pokemon } = this.props;
		const pokemonRoute = routes.pokeball.getPokemon(pokemon.id);

		return (
			<div>
				<div>
					<a>
						<img
							src={pokemon.avatar}
							alt={pokemon.name}
						/>
					</a>
					<div>
						<h4>
							{pokemon.name}
						</h4>
						<p>
							{this.renderPokemonTypes(pokemon.types)}
						</p>
						<Link to={pokemonRoute}>
							Go details
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

Pokemon.propTypes = {
	pokemon: PropTypes.object,
	allTypes: PropTypes.array
};

export default Pokemon;
