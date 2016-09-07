import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PokemonContainer from './Pokemon.container.jsx';
import {actionGetPokemon} from '../../actions/pokeball.actions';


PokemonContainer.propTypes = {
	params: PropTypes.object,
	pokemon: PropTypes.object,
	handleGetPokemon: PropTypes.func
};

const mapStateToProps = (state) => ({
	pokemon: state.pokeball.pokemon
});

const mapDispatchToProps = (dispatch) => ({
	handleActionGetPokemon: bindActionCreators(actionGetPokemon, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer);
