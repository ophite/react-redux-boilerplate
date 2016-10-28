import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PokemonContainer from './Pokemon.container.jsx';
import { actionGetPokemon } from '../../actions/pokeball.actions';


PokemonContainer.propTypes = {
    params: React.PropTypes.object,
    pokemon: React.PropTypes.object,
    handleGetPokemon: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokeball.pokemonModel.model,
        isLoading: state.pokeball.pokemonModel.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => ({
    handleActionGetPokemon: bindActionCreators(actionGetPokemon, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);
