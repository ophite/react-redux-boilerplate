import model from './base.model';
import urls from '../constants/urls.constant';
import { isEmpty } from '../utils/helper';


class pokemonsModel extends model {

    static MODEL_NAME = 'pokemonsModel';
    static TYPE_REQUEST = 'REQUEST_POKEMONS';
    static TYPE_FROM_SERVER = 'GET_POKEMONS';
    static TYPE_CLEAR = 'CLEAR_POKEMONS';

    constructor(props) {
        super(props);
    };

    static apiGet(requestMethod, params = {}) {
        const { limit, offset } = this.toServer(params);
        const url = urls.pokeball.getPokemons();
        const queryParams = (offset !== undefined)
            ? { limit, offset: (offset + limit) }
            : { limit };

        return requestMethod(url, {}, queryParams);
    };

    static create() {
        const props = super.create();
        return {
            data: {
                ...props.data,
                items: [],
            },
            meta: {
                ...props.meta,
                isFirstLoading: false,
                paginator: {},
                hasMore: false
            }
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
            data: {
                items,
            },
            meta: {
                paginator
            }
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

    static toServer(params) {
        if (isEmpty(params)) {
            return {};
        }

        return {
            limit: params.limit,
            offset: params.offset,
        };
    }

    static reduceGet(stateModel, action) {
        const { modelClient, model } = action.payload;
        const {
            data: {
                items: _items,
            },
            meta: _meta
        } = stateModel;

        const {
            data: { items },
            meta
        } = modelClient;

        return {
            [model.MODEL_NAME]: {
                data: {
                    items: [..._items, ...items],
                },
                meta: {
                    ..._meta,
                    ...meta,
                    hasMore: meta.paginator.offset < meta.paginator.total_count,
                    isLoading: false,
                    isFirstLoading: false
                }
            }
        };
    };

    static reduceRequest(stateModel, action, state) {
        const { model } = action.payload;
        const newState = super.reduceRequest(stateModel, action, state)[model.MODEL_NAME];
        const {
            data : { items },
            meta
        } = newState;

        return {
            [model.MODEL_NAME]: {
                ...stateModel,
                meta: {
                    ...stateModel.meta,
                    isFirstLoading: meta.isLoading && (!items || !items.length)
                }
            }
        };
    };
}

export {
    pokemonsModel,
};
