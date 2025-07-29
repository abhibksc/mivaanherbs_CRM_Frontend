import React, { useEffect, useState } from "react";
import API from "../../services/api";

const BVStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/bv-stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return null;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">BV Stats</h2>
      <p>Left BV: ₹{stats.totalLeftBV}</p>
      <p>Right BV: ₹{stats.totalRightBV}</p>
    </div>
  );
};

export default BVStats;
