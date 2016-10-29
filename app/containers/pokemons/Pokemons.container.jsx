import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PokemonsPage from '../../components/pages/pokemons/Pokemons.page.jsx';
import { pokemonsModel } from '../../models/pokemons.model';
import { modelGet } from '../../actions/model.actions';


class PokemonsContainer extends React.Component {

    componentDidMount() {
        this.handleActionGetPokemons();
    }

    componentWillUnmount() {
        const { handleActionClearPokemons } = this.props;
        handleActionClearPokemons();
    }

    handleActionGetPokemons = () => {
        const {
            handleActionGetPokemons,
            meta : { paginator }
        } = this.props;
        const offset = paginator.offset > 0 ? paginator.offset : 0;
        handleActionGetPokemons({ limit: 12, offset });
    };

    render() {
        const { pokemons, meta } = this.props;

        return (
            <PokemonsPage
                pokemons={pokemons}
                meta={meta}
                handleGetPokemons={this.handleActionGetPokemons.bind(this)}
            />
        );
    }
}

PokemonsContainer.propTypes = {
    pokemons: React.PropTypes.object,
    handleGetPokemons: React.PropTypes.func,
    handleClearDataState: React.PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokeball[pokemonsModel.MODEL_NAME].data,
        meta: state.pokeball[pokemonsModel.MODEL_NAME].meta,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleActionGetPokemons: bindActionCreators(modelGet(pokemonsModel), dispatch),
        handleActionClearPokemons: bindActionCreators(pokemonsModel.actionClear(pokemonsModel), dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsContainer);



