import PokemonExt from '../../pokemons/PokemonExt.jsx';


class PokemonPage extends React.Component {

    renderPokemonCard(pokemon) {
        const { isLoading } = this.props;
        if (isLoading) {
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
    pokemon: React.PropTypes.object,
    isLoading: React.PropTypes.bool
};

export default PokemonPage;
