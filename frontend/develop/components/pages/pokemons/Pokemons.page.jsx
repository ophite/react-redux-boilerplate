import Pokemon from '../../pokemons/Pokemon.jsx';
import InfiniteScroll from '../../controls/infiniteScroll/InfiniteScroll.container.jsx';


class PokemonsPage extends React.Component {

	renderPokemonsList() {
		const { handleGetPokemons, pokemons } = this.props;
		if (pokemons.isLoading && (!pokemons.items || pokemons.items.length === 0)) {
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

		return (
			<InfiniteScroll
				loader={<div>Loading...</div>}
				next={handleGetPokemons}
				hasMoreNext={true}
				hasMorePrev={false}>
				{pokemonsView}
			</InfiniteScroll>
		);
	}

	render() {
		const style = { /*height: 500, overflowY: 'auto',*/ position: 'relative', outline: '1px solid red' };

		return (
			<div style={style}>
				{this.renderPokemonsList()}
			</div>
		);
	}
}

PokemonsPage.propTypes = {
	pokemons: React.PropTypes.object,
	handleGetPokemons: React.PropTypes.func
};

export default PokemonsPage;
