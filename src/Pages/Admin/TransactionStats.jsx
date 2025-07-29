import React, { useEffect, useState } from "react";
import API from "../../services/api";

const TransactionStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return null;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Transaction Stats</h2>
      <p>Pending: {stats.pending}</p>
      <p>Success: {stats.success}</p>
      <p>Failed: {stats.failed}</p>
    </div>
  );
};

export default TransactionStats;
