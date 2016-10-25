import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/root.reducer';

const loggerMiddleware = createLogger();

const developMiddleware = process.env.NODE_ENV !== 'production'
    ? [loggerMiddleware]
    : [];

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    ...developMiddleware,
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/root.reducer.js', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}
