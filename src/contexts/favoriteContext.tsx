import React, { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { UserContext } from "./userContext";
import { favoriteType } from "../types/favorite";
import axios from "axios";

interface FavoriteContextProps {
    favorites: favoriteType[] | undefined;
    lengthFavorites: number;
    fetchFavorites: () => void;
    setFavorites: React.Dispatch<React.SetStateAction<favoriteType[] | undefined>>;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

interface FavoriteProviderProps {
    children: ReactNode;
}

const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState<favoriteType[] | undefined>(undefined);

    const fetchFavorites = async () => {
        if (user?._id) {
            const res = await axios.get(`http://localhost:3000/favorite/${user?._id}`);
            setFavorites(res.data.data);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [user?._id]);

    const lengthFavorites = favorites ? favorites.length : 0;

    return (
        <FavoriteContext.Provider value={{ favorites, lengthFavorites, fetchFavorites, setFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export { FavoriteContext, FavoriteProvider };
