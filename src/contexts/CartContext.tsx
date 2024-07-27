import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "../types/products";
import { UserContext } from "./userContext";

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = React.useContext(UserContext);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cartKey = `cart_${user?._id}`;
    const storedCart = localStorage.getItem(cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const clearCart = () => {
    const cartKey = `cart_${user?._id}`;
    localStorage.removeItem(cartKey);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
