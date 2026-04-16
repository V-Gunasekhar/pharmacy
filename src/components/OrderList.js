import { useEffect, useState } from "react";
import { API } from "../api";

function OrderList() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    API.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📦 Orders</h2>

      <button onClick={loadOrders}>
        Refresh Orders
      </button>

      {orders.map((o) => (
        <div key={o.id} style={{ border: "1px solid blue", margin: 10 }}>
          <p>Customer: {o.customerName}</p>
          <p>Medicine ID: {o.medicineId}</p>
          <p>Quantity: {o.quantity}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderList;