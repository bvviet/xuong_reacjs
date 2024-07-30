import { Divider } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import FormatPrice from "../../components/client/FormatPrice/FormatPrice";
import { PurchaseContext } from "../../contexts/purchaseContext";

export default function Purchasee() {
    const context = useContext(PurchaseContext);

    // Kiểm tra nếu context chưa được cung cấp
    if (!context) {
        throw new Error("CartComponent must be used within a PurchaseProvider");
    }

    const { cart, purchaseLength } = context;

    console.log(cart);
    console.log(purchaseLength);

    return (
        <>
            <p className="flex mt-[120px] justify-center text-4xl mb-12">Đơn hàng của bạn</p>

            <div className="w-[993px]  mx-auto ">
                <div>
                    {cart.map((item) => (
                        <div key={item._id} className="">
                            <div
                                className="border-2 border-solid  border-gray-200 mb-12 p-6"
                                style={{ borderRadius: "8px" }}
                            >
                                <div className="flex justify-between">
                                    <span className="text-3xl font-medium">Trạng thái</span>
                                    <span className="text-2xl font-medium text-[#26AA99]">Đang chờ xác nhận</span>
                                </div>
                                <Divider sx={{ margin: "8px 0px 0px 0px", backgroundColor: "rgb(0 0 0 / 9%)" }} />
                                <div className="mt-8 flex justify-between">
                                    <div className="flex items-start">
                                        <img
                                            src={item.product.image}
                                            className="w-[95px] h-[95px]"
                                            alt={item.product.name}
                                        />
                                        <div className="ml-8 flex flex-col">
                                            <span className="text-3xl">{item.product.name}</span>
                                            <span className="text-gray-400 py-2">{item.product.category.name}</span>
                                            <span className="text-[12px] mt-4">X{item.quantity}</span>
                                        </div>
                                    </div>
                                    <span>
                                        <FormatPrice sx={{ ml: 1 }} price={item.product.price} />
                                    </span>
                                </div>
                                <Divider sx={{ margin: "8px 0px 0px 0px", backgroundColor: "rgb(0 0 0 / 9%)" }} />
                                <div className="flex justify-end mt-6">
                                    <div className="flex flex-col">
                                        <div className="flex justify-end ">
                                            Thành tiền:
                                            <FormatPrice
                                                sx={{ ml: 1, color: "red" }}
                                                price={item.product.price * item.quantity}
                                            />
                                        </div>
                                        <div className="mt-12">
                                            <Link
                                                className="inline-block rounded border border-solid border-[#FF5B26] bg-[#FF5B26] px-20 py-4 text-xl font-medium text-white hover:bg-transparent hover:text-[#FF5B26] mr-4"
                                                to={"/detail/" + item.product._id}
                                            >
                                                Mua lại
                                            </Link>
                                            <Link
                                                className="inline-block rounded border-2 border-gray-200 border-solid px-20 py-4 text-xl font-medium text-black  hover:text-white hover:bg-[#FF5B26]"
                                                to={"/"}
                                            >
                                                Liên hệ
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
