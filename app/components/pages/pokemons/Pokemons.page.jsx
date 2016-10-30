import Pokemon from '../../pokemons/Pokemon.jsx';
import InfiniteScroll from '../../controls/infiniteScroll/InfiniteScroll.container.h';


class PokemonsPage extends React.Component {

    renderPokemonsList() {

        const { handleGetPokemons, pokemons } = this.props;
        if (pokemons.isFirstLoading) {
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
                hasMoreNext={pokemons.hasMore}
                hasMorePrev={false}>
                {pokemonsView}
            </InfiniteScroll>
        );
    }

    render() {
        const style = {
            position: 'relative',
            outline: '1px solid red'
        };

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
