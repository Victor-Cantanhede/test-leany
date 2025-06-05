import axios from 'axios';
import { notFound } from 'next/navigation';
import PokemonDetailClient from './PokemonDetailClient';

type PageProps = {
    params: {
        name: string;
    };
}

export default async function PokemonDetailPage({ params }: PageProps) {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
        const p = res.data;
    
        return (
            <PokemonDetailClient pokemon={p} />
        );        
    } catch (error) {
        return notFound();
    }
}