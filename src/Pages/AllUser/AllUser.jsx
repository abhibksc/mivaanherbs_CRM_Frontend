import React, { useEffect, useState } from 'react';
import './AllUser.css';
import axios from 'axios';
import moment from 'moment';

const ActiveUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

    axios.get( `${baseUrl}/allusers`)
      .then(res => setUsers(res?.data))
      .catch(err => console.error(err));
  }, []);

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

  return (
    <div className="active-users-container">
      <h2 className="active-users-heading">All Users</h2>

      {console.log(users)}
      

      {users?.data?.length > 0 ? (
        <table className="active-users-table">
          <thead>
            <tr>
              {Object.keys(users?.data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user, userIndex) => (
              <tr key={userIndex}>
                {Object.entries(user).map(([key, value], valueIndex) => (
                  <td key={valueIndex}>{formatValue(key, value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default ActiveUsers;
