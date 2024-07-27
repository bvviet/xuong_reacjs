import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface TotalPriceContextType {
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const TotalPriceContext = createContext<TotalPriceContextType | undefined>(undefined);

export const TotalPriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Đọc giá trị tổng tiền từ localStorage hoặc thiết lập giá trị mặc định là 0
    const [totalPrice, setTotalPrice] = useState<number>(() => {
        const savedTotalPrice = localStorage.getItem('totalPrice');
        return savedTotalPrice ? JSON.parse(savedTotalPrice) : 0;
    });

    // Lưu tổng tiền vào localStorage khi giá trị thay đổi
    useEffect(() => {
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    }, [totalPrice]);

    return (
        <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
            {children}
        </TotalPriceContext.Provider>
    );
};

export const useTotalPrice = () => {
    const context = useContext(TotalPriceContext);
    if (context === undefined) {
        throw new Error('useTotalPrice must be used within a TotalPriceProvider');
    }
    return context;
};
