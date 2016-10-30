import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PokemonPage from '../../components/pages/pokemons/Pokemon.page.jsx';
import { pokemonModel } from '../../models/pokemon.model';
import { modelGet } from '../../actions/model.actions';


class PokemonContainer extends React.Component {

    componentDidMount() {
        const { params, handleActionGetPokemon } = this.props;
        handleActionGetPokemon({ pokemonId: params.pokemonId });
    }

    render() {
        const { pokemon } = this.props;

        return (
            <PokemonPage
                pokemon={pokemon}
            />
        );
    }
}

PokemonContainer.propTypes = {
    params: React.PropTypes.object,
    pokemon: React.PropTypes.object,
    handleGetPokemon: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokeball[pokemonModel.MODEL_NAME],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleActionGetPokemon: bindActionCreators(modelGet(pokemonModel), dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);
