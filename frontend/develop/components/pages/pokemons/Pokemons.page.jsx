import React, {Component, PropTypes} from 'react';
import Pokemon from '../../pokemons/Pokemon.jsx';


class PokemonsPage extends Component {

	renderPokemonsList(pokemons) {
		const pokemonsView = pokemons.items.map((pokemon) => {
			return (
				<Pokemon
					key={pokemon.id}
					pokemon={pokemon}
					allTypes={pokemon.types}
				/>
			);
		});

		return pokemonsView;
	}

	render() {
		const { pokemons } = this.props;
		const style = { height: 500, overflowY: 'auto', position: 'relative', outline: '1px solid red' };

		return (
			<div className="row" style={style}>
				{this.renderPokemonsList(pokemons)}
			</div>
		);
	}
}

PokemonsPage.propTypes = {
	pokemons: PropTypes.object,
	handleGetPokemons: PropTypes.func
};

export default PokemonsPage;
