'use client';
import { useRouter } from 'next/navigation';

export default function PokemonDetailClient({ pokemon }: { pokemon: any }) {
    const router = useRouter();

    return (
        <div className='p-4 w-max absolute top-[50%] left-[50%] transform -translate-2/4 rounded-lg flex flex-col items-center hover:shadow-md bg-[#0c0c0c] text-gray-400'>
            
            <h1 className='text-2xl capitalize'>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Tipos: {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
            <p>Peso: {pokemon.weight}</p>
            <p>Altura: {pokemon.height}</p>

            <button
                onClick={() => router.back()}
                className='mt-2 p-1 w-full rounded flex-grow cursor-pointer bg-blue-500 text-white'
            >
                Voltar
            </button>
        </div>
    );
}