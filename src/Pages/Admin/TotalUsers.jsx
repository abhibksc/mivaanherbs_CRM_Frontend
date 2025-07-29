import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalUsers = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('/api/admin/total-users', {
      headers: { Authorization: `Bearer ${localStorage.getItem("Admin_token")}` }
    })
    .then(res => setCount(res.data.totalUsers))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="card">
      <h2>Total Users</h2>
      <p>{count}</p>
    </div>
  );
};

export default TotalUsers;
