import { Router } from 'react-router';
import { Provider } from 'react-redux';

import Routes from './Routes.jsx';


class Root extends React.Component {

    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <Router children={Routes} history={history}/>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: React.PropTypes.object,
    routes: React.PropTypes.object,
    history: React.PropTypes.object
};

export default Root;
