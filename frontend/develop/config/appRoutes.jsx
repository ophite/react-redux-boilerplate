import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import App from './../containers/App.jsx';
import Layout from '../containers/layouts/Layout.container.h';
import Pokemon from '../containers/pokemons/Pokemon.container.h';
import Pokemons from '../containers/pokemons/Pokemons.container.h';


export default (
	<Route path="/" component={App}>
		<Route component={Layout}>
			<IndexRedirect to="pokemons"/>

			<Route path="pokemons">
				<IndexRoute component={Pokemons}/>
				<Route path=":pokemonId" component={Pokemon}/>
			</Route>

		</Route>
	</Route>
);

// TODO
// <Route path="404" component={NotFoundPage}/>
// <Route path='*' component={NotFoundPage}/>
