import PokemonsPage from '../../components/pages/pokemons/Pokemons.page.jsx';


class PokemonsContainer extends React.Component {

    componentDidMount() {
        this.handleActionGetPokemons();
    }

    componentWillUnmount() {
        const { handleActionClearPokemons } = this.props;
        handleActionClearPokemons();
    }

    handleActionGetPokemons = () => {
        const { handleActionGetPokemons, pokemons } = this.props;
        const offset = pokemons.paginator.offset > 0 ? pokemons.paginator.offset : 0;
        handleActionGetPokemons({ limit: 12, offset });
    };

    handleGetPokemonsNext() {
        const { handleActionGetPokemons } = this.props;
        handleActionGetPokemons({ ...paginator });
    }

    render() {
        const { pokemons } = this.props;

        return (
            <PokemonsPage
                pokemons={pokemons}
                handleGetPokemons={this.handleActionGetPokemons.bind(this)}
            />
        );
    }
}


export default PokemonsContainer;
