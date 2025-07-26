import React, { useEffect, useState } from 'react';
import './ManageOrder.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  useEffect(() => {
    fetch(`${baseUrl}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);




  return (
    <div className="manage-orders-container">
      <h2>Manage Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Trx</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.trx}</td>
              <td>{order.price}</td>
              <td>{order.totalPrice}</td>
              <td>{order.quantity}</td>
              <td>
                <button className={`status-btn ${order.status.toLowerCase()}`}>
                  {order.status}
                </button>
              </td>
              <td>
                <button className="action-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
