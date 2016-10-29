import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PokemonsContainer from './Pokemons.container.jsx';
import { pokemonsModel } from '../../models/pokemons.model';
import { modelGet } from '../../actions/model.actions';


PokemonsContainer.propTypes = {
    pokemons: React.PropTypes.object,
    handleGetPokemons: React.PropTypes.func,
    handleClearDataState: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokeball[pokemonsModel.MODEL_NAME].model,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleActionGetPokemons: bindActionCreators(modelGet(pokemonsModel), dispatch),
        handleActionClearPokemons: bindActionCreators(pokemonsModel.actionClear(pokemonsModel), dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsContainer);
