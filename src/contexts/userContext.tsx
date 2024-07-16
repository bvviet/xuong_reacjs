import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";

interface User {
    _id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
}

interface UserContextProps {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const dataUser = localStorage.getItem("user");
        if (dataUser) {
            setUser(JSON.parse(dataUser));
        }
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
