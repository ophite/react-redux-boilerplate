export default {
    notFound: () => '/404',
    pokeball: {
        getPokemons: () => '/pokemons',
        getPokemon: (id) => `/pokemons/${id}`,
    },
};
