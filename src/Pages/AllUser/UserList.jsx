// UserList.js
import React, { useEffect, useState } from 'react';
import './AllUser.css';
import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();

  const filter = new URLSearchParams(location.search).get('filter');

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

    axios.get(`${baseUrl}/admin/allusers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('Admin_token')}`
      }
    })
      .then(res => {
        let filtered = res?.data?.data || [];
        console.log(filtered);
        

        switch (filter) {
          case 'active':
            filtered = filtered.filter(u => u.active);
            break;
          case 'email-unverified':
            filtered = filtered.filter(u => !u.isVarified_email);
            break;
          case 'mobile-unverified':
            filtered = filtered.filter(u => !u.isVarified_mobile);
            break;
          // 'all' shows all users by default
        }

        setUsers(filtered);
      })
      .catch(err => console.error(err));
  }, [filter]);

  const formatValue = (key, value) => {
    if (key.toLowerCase().includes('date') || key.toLowerCase().includes('joined')) {
      return (
        <>
          {new Date(value).toISOString().split('T')[0]}<br />
          {moment(value).fromNow()}
        </>
      );
    }
    return value?.toString();
  };


  const handleStatusToggle = async (id, currentStatus , user) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  console.log(currentStatus);
  console.log(user);


  const status = currentStatus ? false : true;
  console.log(status);
  
  
  try {
    await axios.patch(
      `${baseUrl}/admin/user/${id}/status`,
      { is_active: status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('Admin_token')}`
        }
      }
    );

    // Update local state
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === id ? { ...user, active: !currentStatus } : user
      )
    );

    window.location.reload();

  } catch (err) {
    console.error("Failed to update user status:", err);
  }
};


return (
  <div className="active-users-container">
    <h2 className="active-users-heading">Users: {filter}</h2>
    {users?.length > 0 ? (
      <table className="active-users-table">
        <thead>
          <tr>
            {Object.keys(users[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
            <th>Action</th> {/* ✅ Add this line */}
          </tr>
        </thead>
        <tbody>
          {console.log(users)
          }
          {users.map((user, userIndex) => (
            <tr key={userIndex}>
              {Object.entries(user).map(([key, value], valueIndex) => (
                <td key={valueIndex}>{formatValue(key, value)}</td>
              ))}
              <td>
                <button
                  onClick={() => handleStatusToggle(user.userId, user.active  , user)}
                  style={{
                    backgroundColor: user.active ? '#e74c3c' : '#2ecc71',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {user.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Loading or no users found...</p>
    )}
  </div>
);

};

export default UserList;
