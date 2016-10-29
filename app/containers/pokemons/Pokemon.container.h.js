import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PokemonContainer from './Pokemon.container.jsx';
import { pokemonModel } from '../../models/pokemon.model';
import { modelGet } from '../../actions/model.actions';


PokemonContainer.propTypes = {
    params: React.PropTypes.object,
    pokemon: React.PropTypes.object,
    handleGetPokemon: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokeball[pokemonModel.MODEL_NAME].model,
        isLoading: state.pokeball[pokemonModel.MODEL_NAME].isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleActionGetPokemon: bindActionCreators(modelGet(pokemonModel), dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);
