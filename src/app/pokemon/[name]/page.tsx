import axios from 'axios';
import PokemonDetailClient from './PokemonDetailClient';

type Props = {
    params: {
        name: string;
    };
}

export default async function PokemonDetailPage({ params }: Props) {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    const p = res.data;

    return (
        <PokemonDetailClient pokemon={p} />
    );
}