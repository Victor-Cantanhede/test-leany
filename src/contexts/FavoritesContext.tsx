'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type FavoritesContextType = {
    favorites: string[];
    toggleFavorite: (name: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

    // Consultando favoritos em localStorage
    useEffect(() => {
        const stored = localStorage.getItem('favorites');

        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (error) {
                console.error('Erro ao carregar favoritos do localStorage:', error);
            }
        }
    },[]);

    // Salvando alterações em localStorage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (name: string) => {
        setFavorites((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites(): FavoritesContextType {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error('useFavorites deve estar dentro de FavoritesProvider');
    }
    return context;
}