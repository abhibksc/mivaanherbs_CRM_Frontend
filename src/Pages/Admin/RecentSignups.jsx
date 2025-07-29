import React, { useEffect, useState } from "react";
import API from "../../services/api";

const RecentSignups = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/recent-signups")
      .then(res => setUsers(res.data.recentSignups))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Recent Signups</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.full_name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSignups;
