import { Link } from 'react-router';
import routes from '../../constants/routes.constant';


class PokemonExt extends React.Component {

    render() {
        const { pokemon } = this.props;
        const pokemonsRoute = routes.pokeball.getPokemons();
        const center = { textAlign: 'center' };

        return (
            <div>
                <div>
                    <p style={center}>
                        <img
                            src={pokemon.avatar}
                            alt={pokemon.name}
                        />
                    </p>
                    <div>
                        <h4 style={center}>
                            {pokemon.name} #{pokemon.id}
                        </h4>
                        <table>
                            <tbody>
                            <tr>
                                <td>Attack</td>
                                <td>{pokemon.attack}</td>
                            </tr>
                            <tr>
                                <td>Defense</td>
                                <td>{pokemon.defense}</td>
                            </tr>
                            <tr>
                                <td>HP</td>
                                <td>{pokemon.hp}</td>
                            </tr>
                            <tr>
                                <td>SP Attack</td>
                                <td>{pokemon.spAtk}</td>
                            </tr>
                            <tr>
                                <td>SP Defence</td>
                                <td>{pokemon.spDef}</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>{pokemon.speed}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{pokemon.weight}</td>
                            </tr>
                            <tr>
                                <td>Total moves</td>
                                <td>{pokemon.totalMoves}</td>
                            </tr>
                            <tr>
                                <td/>
                                <td>
                                    <Link to={pokemonsRoute}>
                                        back
                                    </Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

PokemonExt.propTypes = {
    pokemon: React.PropTypes.object
};

export default PokemonExt;
