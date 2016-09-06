import React, {Component, PropTypes} from 'react'; // TODO move to define plugin
import {Link} from 'react-router';

import routes from '../../constants/routes.constant';

class Pokemon extends Component {

	renderPokemonTypes(types) {
		return types.map(type => {
				return (
					<span key={type.name} className="label label-info">
						{type.name}
					</span>
				);
			}
		);
	}

	render() {
		const { pokemon, allTypes } = this.props;
		const pokemonRoute = routes.pokeball.getPokemon(pokemon.id);

		return (
			<div className="col-xs-6 col-sm-4 col-md-3">
				<div className="card">
					<a className="text-center">
						<img
							src={pokemon.avatar}
							alt={pokemon.name}
							className="card-img-top"
						/>
					</a>
					<div className="card-block">
						<h4 className="card-title text-center">
							{pokemon.name}
						</h4>
						<p className="card-text">
							{this.renderPokemonTypes(pokemon.types)}
						</p>
						<Link to={pokemonRoute} className="btn btn-secondary">
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
