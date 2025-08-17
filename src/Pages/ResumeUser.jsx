import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ResumeUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("Admin_token");

  // 🔹 Helper: handle API errors consistently
  const handleError = (err, fallbackMsg) => {
    let message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      fallbackMsg ||
      "Something went wrong";

    setErrors((prev) => [...prev, message]);
    toast.error(message);
  };

  // Fetch all users (only deactivated ones)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/admin/allusers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Only show deactivated users
        setUsers((res.data.data || []).filter((u) => u.is_Deactive));
      } catch (err) {
        handleError(err, "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [API_BASE, token]);

  // Handle user selection
  const handleUserChange = (e) => {
    const userId = e.target.value;
    const userObj = users.find((u) => u.userId === userId);
    setSelectedUser(userObj || null);
  };

  // Handle Resume
  const handleResume = async () => {
    if (!selectedUser) {
      toast.error("Please select a user");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}/admin/resume`,
        { userId: selectedUser.userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("User resumed successfully ✅");
      setSelectedUser(null);
      // Refresh list
      setUsers(users.filter((u) => u.userId !== selectedUser.userId));
    } catch (err) {
      handleError(err, "Failed to resume user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-2xl relative">
      <h2 className="text-xl font-bold mb-4 text-green-600">Resume User</h2>

      {/* 🔹 Error Display */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          <h4 className="font-bold mb-1">Errors:</h4>
          <ul className="list-disc pl-5 text-sm">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <button
            onClick={() => setErrors([])}
            className="mt-2 text-xs text-red-500 underline"
          >
            Clear Errors
          </button>
        </div>
      )}

      {/* Select User */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Deactivated User</label>
        <select
          onChange={handleUserChange}
          value={selectedUser?.userId || ""}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select User --</option>
          {users.map((u) => (
            <option key={u.userId} value={u.userId}>
              {u.username} ({u.email})
            </option>
          ))}
        </select>
      </div>

      {/* Wallet + Status */}
      {selectedUser && (
        <div className="mb-4 bg-gray-50 p-3 rounded border">
          <p>
            <span className="font-semibold">Wallet Balance:</span> ₹
            {selectedUser.balance}
          </p>
          <p>
            <span className="font-semibold">Active Status:</span>{" "}
            {selectedUser.is_active ? "✅ Active" : "❌ Inactive"}
          </p>
          <p>
            <span className="font-semibold">Deactivated Reason:</span>{" "}
            {selectedUser.deactivate_reason || "N/A"}
          </p>
        </div>
      )}

      {/* Resume Button */}
      <button
        onClick={handleResume}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Resume User"}
      </button>
    </div>
  );
};

export default ResumeUser;
