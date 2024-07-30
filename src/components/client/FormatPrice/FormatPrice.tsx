import { NumericFormat } from "react-number-format";
import { Box, SxProps, Theme } from "@mui/material";

interface FormatPriceProps {
    price: number | undefined;
    sx?: SxProps<Theme>; // Add sx prop here
}

const FormatPrice = ({ price, sx }: FormatPriceProps) => {
    return (
        <Box sx={sx}>
            <NumericFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" ₫"}
            />
        </Box>
    );
};

export default FormatPrice;
