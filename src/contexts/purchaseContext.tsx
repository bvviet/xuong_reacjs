import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { cartType } from "../types/products";
import { UserContext } from "./userContext";

interface PurchaseContextType {
    cart: cartType[];
    purchaseLength: number;
    getAllOrders: () => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

const PurchaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<cartType[]>([]);
    const { user } = useContext(UserContext);

    const getAllOrders = async () => {
        if (user?._id) {
            try {
                const { data } = await axios.get(`/cart/${user._id}`);
                setCart(data.cartItems || []);
            } catch (error) {
                console.log("Error fetching cart:", error);
            }
        }
    };

    useEffect(() => {
        getAllOrders();
    }, [user?._id]);

    const purchaseLength = cart.length;

    return (
        <PurchaseContext.Provider value={{ cart, purchaseLength, getAllOrders }}>{children}</PurchaseContext.Provider>
    );
};

export { PurchaseProvider, PurchaseContext };
