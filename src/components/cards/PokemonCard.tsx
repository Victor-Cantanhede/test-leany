import { useFavorites } from '@/contexts/FavoritesContext'

type Props = {
    name: string;
    sprite: string;
    types: string[];
    onClick: () => void;
};

export default function PokemonCard({ name, sprite, types, onClick }: Props) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(name);

    return (
        <div onClick={onClick} className='p-4 rounded-lg flex flex-col items-center hover:shadow-md bg-[#0c0c0c] text-gray-400'>
            
            <img src={sprite} alt={name} height={100} width={100}/>
            <h3 className='capitalize font-bold'>{name}</h3>
            <p>{types.join(', ')}</p>

            <div className='w-full flex gap-2'>

                <button
                    className='mt-2 p-1 rounded flex-grow cursor-pointer bg-blue-500 text-white'
                    onClick={onClick}
                >
                    Detalhes
                </button>

                <button
                    className='mt-2 p-1 min-w-[35px] rounded cursor-pointer bg-blue-500 text-white'
                    onClick={(e) => {
                        e.preventDefault() // impede clique de abrir modal
                        toggleFavorite(name)
                    }}
                >
                    {isFavorite ? '⭐' : '☆'}
                </button>

            </div>

        </div>
    );
}