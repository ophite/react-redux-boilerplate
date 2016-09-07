import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PokemonsPage from '../../components/pages/pokemons/Pokemons.page.jsx';

import {actionGetPokemons, actionClearPokemons} from '../../actions/pokeball.actions';
import typesPokemon from '../../actions/types/pokeball.types';


class PokemonsContainer extends Component {

	componentDidMount() {
		const { handleActionGetPokemons } = this.props;
		handleActionGetPokemons({ limit: 12 });
	}

	componentWillUnmount() {
		const { handleActionClearPokemons } = this.props;
		handleActionClearPokemons();
	}

	handleGetPokemonsNext() {
		const { handleActionGetPokemons } = this.props;
		handleActionGetPokemons({ ...paginator });
	}

	render() {
		const { pokemons } = this.props;

		return (
			<PokemonsPage
				pokemons={pokemons}
				handleGetPokemons={this.handleGetPokemonsNext.bind(this)}
			/>
		);
	}
}

PokemonsContainer.propTypes = {
	pokemons: PropTypes.object,
	handleGetPokemons: PropTypes.func,
	handleClearDataState: PropTypes.func
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
