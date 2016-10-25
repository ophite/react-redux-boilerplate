import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/**
 * Reducers
 */
import pokeball from './pokeball.reducer';
import common from './common.reducer';

const rootReducer = combineReducers({
    pokeball,
    common,
    routing: routerReducer,
});

export default rootReducer;
