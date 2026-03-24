import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {

    const { backendUrl, token, currency } = useContext(ShopContext)

    const [orderData, setorderData] = useState([])

    const verifyStripePayment = async () => {
        const params = new URLSearchParams(window.location.search)
        const sessionId = params.get("session_id")
        const orderId = params.get("orderId")
        const status = params.get("stripe")

        if (!token || !sessionId || !orderId || status !== "success") {
            return
        }

        try {
            const response = await axios.post(
                backendUrl + '/api/order/verifystripe',
                { orderId, sessionId },
                { headers: { token } }
            )

            if (response.data.success) {
                toast.success("Stripe payment verified")
            } else {
                toast.error(response.data.message)
            }

            window.history.replaceState({}, "", "/orders")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const loadOrderData = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
            //console.log(response.data);
            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setorderData(allOrdersItem.reverse())
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        verifyStripePayment()
        loadOrderData()
    }, [token])

    return (
        <div className="border-t border-slate-200 pt-16">
            <div className="text-2xl">
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div className="space-y-4 mt-3">
                {
                    orderData.map((item, index) => (
                        <div className="elev-card p-4 sm:p-5 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4" key={index}>
                            <div className="flex items-start gap-6 text-sm">
                                <img className="w-16 sm:w-20 rounded-lg border border-gray-200" src={item.image[0]} alt="" />
                                <div>
                                    <p className="sm:text-base font-semibold text-[#17212f]">{item.name}</p>
                                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                        <p>{currency}{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p className="subtle-tag px-2 py-0.5 text-xs">Size: {item.size}</p>
                                    </div>
                                    <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                                    <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="min-w-2.5 h-2.5 rounded-full bg-emerald-500"></p>
                                    <p className="text-sm md:text-base font-medium">{item.status}</p>
                                </div>

                                <button onClick={loadOrderData} className="border border-gray-300 bg-white px-4 py-2 text-sm font-medium rounded-full hover:shadow-sm transition">Track Order</button>

                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Orders;