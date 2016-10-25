import { Link } from 'react-router';
import routes from '../../constants/routes.constant';


class Pokemon extends React.Component {

    renderPokemonTypes(types) {
        return types
            .map(type => {
                    return (
                        <span key={type.name}>
                            {type.name}
                        </span>
                    );
                }
            );
    }

    render() {
        const { pokemon } = this.props;
        const pokemonRoute = routes.pokeball.getPokemon(pokemon.id);

        return (
            <div>
                <div>
                    <a>
                        <img
                            src={pokemon.avatar}
                            alt={pokemon.name}
                        />
                    </a>
                    <div>
                        <h4>
                            {pokemon.name}
                        </h4>
                        <p>
                            {this.renderPokemonTypes(pokemon.types)}
                        </p>
                        <Link to={pokemonRoute}>
                            Go details
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

Pokemon.propTypes = {
    pokemon: React.PropTypes.object,
    allTypes: React.PropTypes.array
};

export default Pokemon;
