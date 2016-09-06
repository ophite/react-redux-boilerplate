import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PokemonPage from '../../components/pages/pokemons/Pokemon.page.jsx';
import {actionGetPokemon} from '../../actions/pokeball.actions';

class PokemonContainer extends Component {

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
