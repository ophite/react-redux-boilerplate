import PokemonsPage from '../../components/pages/pokemons/Pokemons.page.jsx';


class PokemonsContainer extends React.Component {

	componentDidMount() {
		const { handleActionGetPokemons } = this.props;
		handleActionGetPokemons({ limit: 12 });
	}

	componentWillUnmount() {
		const { handleActionClearPokemons } = this.props;
		handleActionClearPokemons();
	}

	handleGetPokemonsNext() {
		const { handleActionGetPokemons } = this.props;
		handleActionGetPokemons({ ...paginator });
	}

	render() {
		const { pokemons } = this.props;

		return (
			<PokemonsPage
				pokemons={pokemons}
				handleGetPokemons={this.handleGetPokemonsNext.bind(this)}
			/>
		);
	}
}


export default PokemonsContainer;
