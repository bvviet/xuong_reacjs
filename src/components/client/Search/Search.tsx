import "./Search.css";
import { Box } from "@mui/material";

import search from "../../../assets/icons/Search.svg";
import loadingSearch from "../../../assets/icons/loadingSearch.svg";
import clear from "../../../assets/icons/clear.svg";

const Search = () => {
    return (
        <Box sx={{ marginRight: "120px" }}>
            <form action="" className="search-form">
                <div className="search-group">
                    <input type="text" placeholder="Tìm kiếm sản phẩm" className="input-search" />
                    <img src={loadingSearch} alt="" className="icon icon-load" />
                    <img src={clear} alt="" className="icon icon-clear" />
                    <button className="icon-search">
                        <img src={search} alt="" />
                    </button>
                </div>
            </form>
        </Box>
    );
};
export default Search;
