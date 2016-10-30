import model from './base.model';
import urls from '../constants/urls.constant';
import { isEmpty } from '../utils/helper';


class pokemonModel extends model {

    static MODEL_NAME = 'pokemonModel';
    static TYPE_REQUEST = 'REQUEST_POKEMON';
    static TYPE_FROM_SERVER = 'GET_POKEMON';
    static TYPE_CLEAR = 'CLEAR_POKEMON';

    constructor(props) {
        super(props);
    };

    static apiGet(requestMethod, params = {}) {
        const { pokemonId } = this.toServer(params);
        const url = urls.pokeball.getPokemon(pokemonId);
        return requestMethod(url);
    };

    static toClient(serverModel) {
        if (!serverModel) {
            return this.create();
        }

        const data = {
            id: serverModel.pkdx_id,
            name: serverModel.name,
            // avatar: `http://pokeapi.co/media/img/${res.pkdx_id}.png`,
            avatar: `https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/sprites/pokemon/model/${serverModel.pkdx_id}.png`,
            attack: serverModel.attack,
            defense: serverModel.defense,
            hp: serverModel.hp,
            spAtk: serverModel.sp_atk,
            spDef: serverModel.sp_def,
            speed: serverModel.speed,
            weight: serverModel.weight,
            totalMoves: serverModel.moves.length
        };

        return data;
    };

    static toServer(params) {
        if (isEmpty(params)) {
            return {};
        }

        return {
            pokemonId: params.pokemonId,
        };
    };
}

export {
    pokemonModel,
};
