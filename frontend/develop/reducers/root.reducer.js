import {combineReducers} from 'redux';

/**
 * Reducers
 */
import pokeball from './pokeball.reducer';
import common from './common.reducer';

const rootReducer = combineReducers({
	pokeball,
	common
});

export default rootReducer;
