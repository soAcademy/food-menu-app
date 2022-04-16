import React, { useState, useEffect } from "react";
import axios from "axios";

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [tableId, setTableId] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/get-orders"
      );
      console.log(result.data);
      setOrders(result.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-3xl text-center mt-4">รายการสั่งอาหาร</h1>
      <div class="grid grid-cols-4 grid-flow-row gap-4 my-4">
        {[...Array(20).keys()].map((id) => (
          <div
            onClick={() => setTableId(id + 1)}
            className="bg-red-200 active:bg-red-300 text-center py-2 rounded-lg"
          >
            {id + 1}
          </div>
        ))}
      </div>
      {orders
        .filter((order) => tableId === 0 || tableId === order.table_id)
        .map((order) => (
          <div className="py-2 text-sm">
            <div>หมายเลขคำสั่ง #{order.order_id}</div>
            <div>โต๊ะ: {order.table_id}</div>
            <div>สถานะ: {order.status}</div>
            {order.items.map((item) => (
              <div className="flex">
                <div className="flex-auto">{item.name}</div>
                <div>
                  ฿{item.price} x {item.quantity}
                </div>
              </div>
            ))}
            <div className="text-right">
              รวม ฿{order.total_price.toLocaleString()}
            </div>
          </div>
        ))}
    </div>
  );
};
