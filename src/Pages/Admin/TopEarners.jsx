import React, { useEffect, useState } from "react";
import API from "../../services/api";

const TopEarners = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/top-earners")
      .then(res => setUsers(res.data.topEarners))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Top Earners</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.username} - ₹{u.wallet_balance}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopEarners;
