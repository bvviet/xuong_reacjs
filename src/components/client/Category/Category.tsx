import { useContext, useEffect, useState } from "react";
import "./Category.css";
import axios from "axios";
import { Box } from "@mui/material";
import { Category as CategoryTypes } from "../../../types/products";
import { ProductsContext } from "../../../contexts/ProductsContext";

const Category = () => {
    const [categories, setCategories] = useState<CategoryTypes[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [categoriesItem, setCategoriesItem] = useState<string | null>(null);
    const context = useContext(ProductsContext);
    const { setProducts } = context;

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Lấy danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/categories");
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    // Lấy sản phẩm theo danh mục
    useEffect(() => {
        const fetchCategoriesProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/products/category?categoryName=${categoriesItem}`
                );
                setProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (categoriesItem) {
            fetchCategoriesProduct();
        }
    }, [categoriesItem]);

    return (
        <div className="category" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Danh mục
            {isHovered && (
                <div className="category-content">
                    {categories.map((item) => (
                        <Box key={item._id} sx={{ padding: "10px" }}>
                            <p
                                className="categories-item"
                                onClick={() => {
                                    setCategoriesItem(item.name);
                                }}
                            >
                                {item.name}
                            </p>
                        </Box>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
