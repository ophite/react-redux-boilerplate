import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PokemonsContainer from './Pokemons.container.jsx';
import { pokemonsModel } from '../../models/pokemons.model';
import { fail } from '../../actions/common.actions';
import { apiClient } from '../../api/';


PokemonsContainer.propTypes = {
    pokemons: React.PropTypes.object,
    handleGetPokemons: React.PropTypes.func,
    handleClearDataState: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokeball[pokemonsModel.MODEL_NAME],
    };
};

const mapDispatchToProps = (dispatch) => {
    const api = apiClient();
    return {
        handleActionGetPokemons: bindActionCreators(pokemonsModel.actionGet(api.get.bind(api), pokemonsModel, fail), dispatch),
        handleActionClearPokemons: bindActionCreators(pokemonsModel.actionClear(pokemonsModel), dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsContainer);
