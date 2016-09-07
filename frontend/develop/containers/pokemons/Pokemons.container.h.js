import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PokemonsContainer from './Pokemons.container.jsx';
import {actionGetPokemons, actionClearPokemons} from '../../actions/pokeball.actions';


PokemonsContainer.propTypes = {
	pokemons: React.PropTypes.object,
	handleGetPokemons: React.PropTypes.func,
	handleClearDataState: React.PropTypes.func
};

const mapStateToProps = (state) => {
	return {
		pokemons: state.pokeball.pokemons
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleActionGetPokemons: bindActionCreators(actionGetPokemons, dispatch),
		handleActionClearPokemons: bindActionCreators(actionClearPokemons, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsContainer);
