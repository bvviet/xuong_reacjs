import { createContext, ReactNode, useState } from "react";

interface LoadingContextProps {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

interface LoadingProviderProps {
    children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

export { LoadingContext, LoadingProvider };
