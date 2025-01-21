import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendURL}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    const confirmChange = window.confirm(`Are you sure you want to change the status to "${newStatus}"?`);

    if (!confirmChange) {
      return; // Exit if the user cancels the action
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(`Order status updated to "${newStatus}"`);
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="pt-16">
      <div className="border-t">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
        >
          {/* Parcel Icon */}
          <div>
            <img className="w-16" src={assets.parcel_icon} alt="Parcel Icon" />
          </div>

          {/* Order Items */}
          <div>
            {order.items?.map((item, idx) => (
              <p key={idx}>
                {item.name} x {item.quantity} <span>{item.size}</span>
                {idx !== order.items.length - 1 && ", "}
              </p>
            ))}
          </div>

          {/* Address */}
          <div>
            <p>{`${order.address?.firstName || ""} ${order.address?.lastName || ""}`}</p>
            <p>{order.address?.street}</p>
            <p>
              {order.address?.division || ""}, {order.address?.country || ""}
            </p>
            <p>{order.address?.phone}</p>
          </div>

          {/* Order Details */}
          <div>
            <p>Items: {order.items?.length ?? 0}</p>
            <p>Method: {order.paymentMethod || "N/A"}</p>
            <p>Payment: {order.payment ? "Done" : "Pending"}</p>
            <p>
              Date:{" "}
              {order.date
                ? new Date(order.date).toLocaleDateString()
                : "Invalid Date"}
            </p>
          </div>

          {/* Order Amount and Status */}
          <div>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-bold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
