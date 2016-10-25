import PokemonPage from '../../components/pages/pokemons/Pokemon.page.jsx';


class PokemonContainer extends React.Component {

    componentDidMount() {
        const { params, handleActionGetPokemon } = this.props;
        handleActionGetPokemon({ pokemonId: params.pokemonId });
    }

    render() {
        const { pokemon, isLoading } = this.props;

        return (
            <PokemonPage
                pokemon={pokemon}
                isLoading={isLoading}
            />
        );
    }
}

export default PokemonContainer;
