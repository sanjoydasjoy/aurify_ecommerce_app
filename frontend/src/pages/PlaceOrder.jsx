import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
        useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        district: "",
        division: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find((product) => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            };

            switch (method) {
                case "cod":
                    const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
                    if (response.data.success) {
                        setCartItems({});
                        toast.success("Order placed successfully")
                        navigate("/orders");
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                case "bkash":
                case "stripe":
                case "razorpay":
                    toast.info("Processing secure payment...")
                    const mockResponse = await axios.post(backendUrl + "/api/order/mock", {
                        ...orderData,
                        paymentMethod:
                            method === "bkash"
                                ? "bKash"
                                : method === "stripe"
                                    ? "Stripe"
                                    : "Razorpay",
                    }, {
                        headers: { token },
                    });

                    if (mockResponse.data.success) {
                        setCartItems({});
                        toast.success(mockResponse.data.message);
                        navigate("/orders");
                    } else {
                        toast.error(mockResponse.data.message || "Mock payment failed");
                    }
                    break;
                default:
                    toast.error("Please select a valid payment method");
                    break;
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col sm:flex-row justify-between gap-5 pt-5 sm:pt-14 min-h-[80vh] border-t border-slate-200"
        >
            {/* Left Side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px] elev-card p-5 sm:p-6">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="firstName"
                        value={formData.firstName}
                        className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="lastName"
                        value={formData.lastName}
                        className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                        type="text"
                        placeholder="Last Name"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                    type="text"
                    placeholder="Street"
                />
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="district"
                        value={formData.district}
                        className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                        type="text"
                        placeholder="District"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="division"
                        value={formData.division}
                        className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                        type="text"
                        placeholder="Division"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={formData.zipcode}
                        className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                        type="number"
                        placeholder="Zipcode"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className="border border-gray-300 rounded-lg py-2 px-3.5 w-full bg-white"
                    type="number"
                    placeholder="Phone"
                />
            </div>

            {/* Right Side */}
            <div className="mt-8 elev-card p-5 sm:p-6 min-w-80 h-fit">
                <div className="mt-2">
                    <CartTotal />
                </div>
                <div className="mt-12">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    {/* Payment Methods Selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div
                                onClick={() => setMethod("bkash")}
                            className="flex items-center gap-3 border border-gray-200 bg-white p-2 px-3 cursor-pointer rounded-full"
                        >
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "bkash" ? "bg-green-400" : ""
                                }`}
                            ></p>
                                <img src={assets.bkash_logo} alt="bKash" className="h-5" />
                            </div>
                            <div
                                onClick={() => setMethod("stripe")}
                                className="flex items-center gap-3 border border-gray-200 bg-white p-2 px-3 cursor-pointer rounded-full"
                            >
                                <p
                                    className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "stripe" ? "bg-green-400" : ""
                                }`}
                                ></p>
                                <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
                            </div>
                            <div
                                onClick={() => setMethod("razorpay")}
                                className="flex items-center gap-3 border border-gray-200 bg-white p-2 px-3 cursor-pointer rounded-full"
                            >
                                <p
                                    className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "razorpay" ? "bg-green-400" : ""
                                }`}
                                ></p>
                                <img src={assets.razorpay_logo} alt="Razorpay" className="h-5" />
                        </div>
                        <div
                            onClick={() => setMethod("cod")}
                            className="flex items-center gap-3 border border-gray-200 bg-white p-2 px-3 cursor-pointer rounded-full"
                        >
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "cod" ? "bg-green-400" : ""
                                }`}
                            ></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>
                    {(method === "bkash" || method === "stripe" || method === "razorpay") && (
                        <div className="mt-4 border rounded p-3">
                            <p className="text-sm text-gray-600">Secure payment gateway simulation enabled for demo mode.</p>
                        </div>
                    )}
                    <div className="w-full text-end mt-8">
                        <button type="submit" className="btn-primary px-16 py-3 text-sm">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
