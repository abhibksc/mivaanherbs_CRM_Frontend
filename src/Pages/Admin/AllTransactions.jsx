import React, { useEffect, useState } from "react";
import API from "../../services/api";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("/allTxn")
      .then(res => setTransactions(res.data.transactions))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">All Transactions</h2>
      <ul className="text-sm">
        {transactions.map(txn => (
          <li key={txn._id}>{txn.user_id?.username} - ₹{txn.package_amount} - {txn.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllTransactions;
