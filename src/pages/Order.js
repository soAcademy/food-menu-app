import React, { useState, useEffect } from "react";
import axios from "axios";

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [tableId, setTableId] = useState(0);
  const [updateOrderStatusFlag, setUpdateOrderStatusFlag] = useState(false);

  useEffect(() => {
    axios({
      method: "post",
      url: "https://sprinttech-food-menu-api-iinykauowa-uc.a.run.app/get-orders-by-table",
      data: {
        table_id: tableId,
      },
    })
      .then((response) => {
        console.log("orderByTableId: ", response.data);
        setOrders(response.data);
      })
      .catch((err) => {
        console.log("err here: ", err);
      });
  }, [tableId, updateOrderStatusFlag]);

  const updateOrderStatus = (orderId) => {
    axios({
      method: "post",
      url: "https://sprinttech-food-menu-api-iinykauowa-uc.a.run.app/update-order-status",
      data: {
        order_id: orderId,
        status: "DONE",
      },
    }).then((response) => {
      console.log("updateOrder: ", response.data);
      setUpdateOrderStatusFlag(!updateOrderStatusFlag)
    });
  };

  const tableList = [...Array(15).keys()]; // [0, 1, 2, 3, ..., 14, 15]
  return (
    <div className="px-4">
      <h1 className="text-3xl text-center mt-4">รายการสั่งอาหาร</h1>
      โต๊ะที่เลือก: {tableId}
      <div className="grid grid-cols-5 grid-flow-row gap-4 my-4">
        {tableList.map((id, index) => (
          <button
            key={index}
            onClick={() => setTableId(id + 1)}
            className="bg-red-200 active:bg-red-300 text-center py-2 rounded-full"
          >
            {id + 1}
          </button>
        ))}
      </div>
      จำนวนคำสั่งซื้อ: {orders.length}
      {orders.map((order) => (
        <div className="py-2 my-8 text-sm border border-green-700">
          <div>หมายเลขคำสั่ง #{order.order_id}</div>
          <div>โต๊ะ: {order.table_id}</div>
          <div>สถานะ: {order.status}</div>
          <div className="bg-red-300">
            {order.items.map((item) => (
              <div className="flex">
                <div className="flex-auto">{item.name}</div>
                <div>
                  ฿{item.price} x {item.quantity}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => updateOrderStatus(order.order_id)}>
            ทำเสร็จแล้ว
          </button>
          <div className="text-right">
            รวม ฿{order.total_price.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};
