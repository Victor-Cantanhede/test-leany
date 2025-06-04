'use client';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { getPokemons } from '@/infrastructure/pokeapi/getPokemons';
import PokemonCard from '@/components/cards/PokemonCard';
import Link from 'next/link';

export default function HomePage() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const [search, setSearch] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  // Consultar mais 20 pokemons
  const fetchMore: any = async () => {
    const data = await getPokemons(offset);
    setPokemons((prev) => [...prev, ...data]);
    setOffset((prev) => prev + 20);
  };

  // Consulta de pokemons da API ao renderizar o componente
  useEffect(() => { fetchMore() },[]);

  // Filtrar pokemons carregados
  const filteredPokemons = pokemons.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter
      ? p.types.includes(typeFilter)
      : true;
    return matchesName && matchesType;
  });

  // Lista de tipos (poderia ser dinâmica, aqui é fixa para exemplo)
  const pokemonTypes = [
    'normal', 'fire', 'water', 'grass', 'electric', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];
  
  return (
    <>
      {/* Barra de busca e filtro */}
      <div className='p-4 w-full border flex flex-col sm:flex-row gap-4 mb-4 bg-blue-500'>
        <input
          type='text'
          placeholder='Buscar por nome...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='p-2 outline-0 rounded flex-grow text-black w-full sm:w-1/2 bg-white shadow-lg'
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className='p-2 outline-0 rounded text-black w-full sm:w-1/4 bg-white shadow-lg'
        >
          <option value=''>Todos os tipos</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0) + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Pokemons */}
      <main className='p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 bg-black'>

        {filteredPokemons.map((p) => (
          <Link href={`/pokemon/${p.name}`} key={v4()}>
            <PokemonCard {...p} onClick={() => {}} />
          </Link>
        ))}

        <button onClick={fetchMore} className='col-span-full mt-4 p-2 bg-blue-500 text-white rounded'>
          Carregar mais
        </button>
      </main>    
    </>
  );
}