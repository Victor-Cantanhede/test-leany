import axios from 'axios';

// Chamada de pokemons
export const getPokemons = async (offset = 0, limit = 20) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

    const data = await Promise.all(
        res.data.results.map(async (pokemon: any) => {
            const detail = await axios.get(pokemon.url);

            return {
                id: detail.data.id,
                name: detail.data.name,
                sprite: detail.data.sprites.front_default,
                types: detail.data.types.map((t: any) => t.type.name),
            };
        })
    );
    return data;
};