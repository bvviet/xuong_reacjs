import "./Search.css";
import { Box, Stack, Typography } from "@mui/material";
import search from "../../../assets/icons/Search.svg";
import loadingSearch from "../../../assets/icons/loadingSearch.svg";
import clear from "../../../assets/icons/clear.svg";
import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../../../types/products";
import FormatPrice from "../FormatPrice/FormatPrice";

const Search = () => {
    const [searchResult, setSearchResult] = useState<IProduct[]>([]);
    const [valueInput, setValueInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showTippy, setShowTippy] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleHideResult = () => {
        setShowTippy(false);
    };

    const clearIcon = () => {
        setValueInput("");
        setShowTippy(false);
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (!valueInput.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const result = await axios.get("http://localhost:3000/products/search", {
                    params: {
                        name: valueInput,
                    },
                });
                setSearchResult(result.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (valueInput.trim() !== "") {
            fetchProduct();
        } else {
            setSearchResult([]);
        }
    }, [valueInput]);

    console.log(searchResult);

    return (
        <Tippy
            visible={showTippy && searchResult.length > 0}
            onClickOutside={handleHideResult}
            interactive
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <div className="wrapper">
                        <Typography sx={{ fontSize: "1.4rem", fontWeight: "500" }}>Sản phẩm</Typography>
                        <hr style={{ opacity: "0.3" }} />
                        {searchResult.map((item) => (
                            <div className="result-item" key={item._id}>
                                <Link
                                    to={`/detail/${item._id}`}
                                    className="link-result"
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                >
                                    <Stack direction="row" spacing={2}>
                                        <img src={item.image} alt="" className="img-result" />
                                        <Typography sx={{ fontSize: "1.4rem", fontWeight: "500", lineHeight: "1.6" }}>
                                            {item.name}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            maxWidth: "126px",
                                            fontSize: "1.2rem",
                                            color: "gray",
                                        }}
                                    >
                                        Giá:
                                        <Box sx={{ marginLeft: "4px" }}>
                                            <FormatPrice price={item.price} />
                                        </Box>
                                        <Box>
                                            Danh mục:{" "}
                                            <Typography component="span" sx={{ color: "#53382c", fontWeight: "700" }}>
                                                {item.category?.name}
                                            </Typography>
                                        </Box>
                                    </Typography>
                                </Link>
                                <hr style={{ opacity: "0.3" }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        >
            <Box sx={{ marginRight: "120px" }}>
                <form action="" className="search-form">
                    <div className="search-group">
                        <input
                            type="text"
                            ref={inputRef}
                            placeholder="Tìm kiếm sản phẩm"
                            className="input-search"
                            value={valueInput}
                            onFocus={() => setShowTippy(true)} // Show Tippy when input is focused
                            onChange={(e) => setValueInput(e.target.value)}
                        />
                        {loading && <img src={loadingSearch} alt="" className="icon icon-load" />}
                        {valueInput && !loading && (
                            <img src={clear} alt="" className="icon icon-clear" onClick={clearIcon} />
                        )}
                        <button type="submit" className="icon-search">
                            <img src={search} alt="" />
                        </button>
                    </div>
                </form>
            </Box>
        </Tippy>
    );
};

export default Search;
