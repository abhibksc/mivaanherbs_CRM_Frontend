import React, { useEffect, useState } from 'react';
import './UnverifiedMobile.css';
import axios from 'axios';
import moment from 'moment';

const ActiveUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/mobile-unverified')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="active-users-container">
      <h2 className="active-users-heading">All Users</h2>
      <table className="active-users-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Email - Mobile</th>
            <th>Country</th>
            <th>Joined At</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}<br />@{user.username}</td>
              <td>{user.email}<br />+91-{user.mobile}</td>
              <td>{user.country}</td>
              <td>
                {new Date(user.joinedAt).toISOString().split('T')[0]}<br />
                {moment(user.joinedAt).fromNow()}
              </td>
              <td>₹{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 

export default ActiveUsers;
 