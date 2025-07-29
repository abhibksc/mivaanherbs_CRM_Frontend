import React, { useEffect, useState } from "react";
import API from "../../services/api";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("/recent")
      .then(res => setTransactions(res.data.recentTransactions))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Recent Transactions</h2>
      <ul className="text-sm">
        {transactions.map(txn => (
          <li key={txn._id}>{txn.user_id?.username} - ₹{txn.package_amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
