import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const filter = new URLSearchParams(location.search).get('filter');
  console.log(filter);
  

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
        }

        setUsers(filtered);
        console.log(filtered);
        
      })
      .catch(err => console.error(err));
  }, [filter]);

  const formatValue = (key, value) => {
    if (key.toLowerCase().includes('date') || key.toLowerCase().includes('joined')) {
      return (
        <>
          {new Date(value).toISOString().split('T')[0]}<br />
          <span className="text-sm text-gray-500">{moment(value).fromNow()}</span>
        </>
      );
    }
    return value?.toString();
  };

  const handleStatusToggle = async (id, currentStatus, user) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    const status = !currentStatus;

    try {
      await axios.post(
        `${baseUrl}/admin/activate`,
        { username: user.username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('Admin_token')}`
          }
        }
      );

      setUsers(prev =>
        prev.map(u =>
          u._id === id ? { ...u, active: status } : u
        )
      );

      window.location.reload();
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  return (
    <div className="p-6  bg-white">
      <h2 className="text-2xl font-bold mb-6">
        Users <span className="text-blue-600">({filter || 'all'})</span>
      </h2>

      {users?.length > 0 ? (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                {Object.keys(users[0]).map((key, idx) => (
                  <th key={idx} className="py-3 px-4 border-b">{key}</th>
                ))}
                <th className="py-3 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {users.map((user, userIndex) => (
                <tr key={userIndex} className="hover:bg-gray-50 border-t">
                  {Object.entries(user).map(([key, value], idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      {formatValue(key, value)}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleStatusToggle(user.userId, user.active, user)}
                      className={`px-4 py-1 rounded text-white font-medium transition duration-200 
                        ${user.active ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                      {user.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading or no users found...</p>
      )}
    </div>
  );
};

export default UserList;
