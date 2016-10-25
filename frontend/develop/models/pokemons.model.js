import model from './base.model';
import urls from '../constants/urls.constant';


class pokemonsModel extends model {

    static MODEL_NAME = 'pokemonsModel';
    static TYPE_REQUEST = 'REQUEST_POKEMONS';
    static TYPE_FROM_SERVER = 'GET_POKEMONS';
    static TYPE_CLEAR = 'CLEAR_POKEMONS';

    constructor(props) {
        super(props);
    };

    static apiGet(serverModel = {}) {
        const { limit, offset } = serverModel;
        const url = urls.pokeball.getPokemons();
        const queryParams = (offset !== undefined)
            ? { limit, offset: (offset + limit) }
            : { limit };

        return super
            .apiClient()
            .get(url, {}, queryParams);
    };

    static create() {
        return {
            items: [],
            isFirstLoading: false,
            paginator: {},
            hasMore: false,
            isLoading: false
        };
    };

    static toClient(serverModel) {
        if (!serverModel) {
            return this.create();
        }

        const { meta, objects } = serverModel;
        const paginator = this.toClientPaginator(meta);
        const items = objects
            .map((pokemon) => ({
                id: pokemon.pkdx_id,
                name: pokemon.name,
                // avatar: `http://pokeapi.co/media/img/${pokemon.pkdx_id}.png`,
                avatar: `https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/sprites/pokemon/model/${pokemon.pkdx_id}.png`,
                types: pokemon.types
            }));

        return {
            items,
            paginator
        };
    };

    static toClientPaginator(serverModel) {
        const paginator = {
            limit: serverModel.limit,
            next: serverModel.next,
            offset: serverModel.offset,
            previous: serverModel.previous,
            total_count: serverModel.total_count
        };

        return paginator;
    };

    static toServer(clientModel) {
        if (super.isEmpty(clientModel)) {
            return {};
        }

        return {
            limit: clientModel.limit,
            offset: clientModel.offset,
        };
    }

    static reduceGet(stateModel, action) {
        const { modelClient, model } = action.payload;
        const {
            items: _items,
        } = stateModel;

        const { items, paginator } = modelClient;

        return {
            [model.MODEL_NAME]: {
                paginator,
                hasMore: paginator.offset < paginator.total_count,
                items: [..._items, ...items],
            }
        };
    };

    static reduceRequest(stateModel, action, state) {
        const { model } = action.payload;
        const newState = super.reduceRequest(stateModel, action, state)[model.MODEL_NAME];
        return {
            [model.MODEL_NAME]: {
                ...stateModel,
                isFirstLoading: newState.isLoading && (!newState.items || newState.items.length === 0)
            }
        };
    };
}

export {
    pokemonsModel,
};
