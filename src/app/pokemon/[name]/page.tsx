import { notFound } from 'next/navigation';
import axios from 'axios';
import PokemonDetailClient from './PokemonDetailClient';


interface PokemonDetailPageProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
    const { name } = await params;

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const p = res.data;
    
        return (
            <PokemonDetailClient pokemon={p} />
        );        
    } catch (error) {
        return notFound();
    }
}