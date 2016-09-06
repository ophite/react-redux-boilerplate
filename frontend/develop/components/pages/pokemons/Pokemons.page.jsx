import React, { Component, PropTypes } from 'react';
import Pokemon from '../../pokemons/Pokemon.jsx';

class PokemonsPage extends Component {
    renderPokemonsList(pokemons = {}) {
        return pokemons.result.map((key) => (
            <Pokemon
              key={key}
              pokemon={pokemons.entities[key]}
              allTypes={pokemons.types}
            />
        ));
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
    apiMeta: PropTypes.object,
    pokemons: PropTypes.object,
    handleGetPokemons: PropTypes.func,
};

export default PokemonsPage;
