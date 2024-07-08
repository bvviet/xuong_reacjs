import { NumericFormat } from "react-number-format";

interface FormatPriceProps {
    price: number | undefined;
}

const FormatPrice = ({ price }: FormatPriceProps) => {
    return (
        <div>
            <NumericFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VNĐ"}
                style={{ color: "#53382c", fontWeight: "700" }}
            />
        </div>
    );
};

export default FormatPrice;
