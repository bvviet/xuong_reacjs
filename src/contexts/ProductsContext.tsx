import React, { createContext, ReactNode, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { IProduct } from "../types/products";

// Định nghĩa kiểu cho giá trị context
interface ProductsContextProps {
    products: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

// Tạo context với giá trị mặc định
const ProductsContext = createContext<ProductsContextProps>({
    products: [],
    setProducts: () => {},
});

interface ProductsProviderProps {
    children: ReactNode;
}

const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchAllProducts();
    }, []);

    return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>;
};

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ProductsContext, ProductsProvider };
