import Pokemon from '../../pokemons/Pokemon.jsx';


class PokemonsPage extends React.Component {

	renderPokemonsList(pokemons) {
		if (pokemons.isLoading) {
			return (<div>Loading</div>)
		}

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
			<div style={style}>
				{this.renderPokemonsList(pokemons)}
			</div>
		);
	}
}

PokemonsPage.propTypes = {
	pokemons: React.PropTypes.object,
	handleGetPokemons: React.PropTypes.func
};

export default PokemonsPage;
