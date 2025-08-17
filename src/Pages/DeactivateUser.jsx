import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DeactivateUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("Admin_token");

  // ✅ Predefined deactivation reasons
  const reasons = [
    "Fraudulent Activity",
    "User Requested Deactivation",
    "Violation of Policies",
    "Multiple Accounts Detected",
    "Inactive / Dormant Account",
    "Other",
  ];

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

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/admin/allusers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.data || []);
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

  // Handle deactivation
  const handleDeactivate = async () => {
    if (!selectedUser) {
      toast.error("Please select a user");
      return;
    }
    if (!selectedReason) {
      toast.error("Please select a reason");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}/admin/deactivate`,
        {
          userId: selectedUser.userId,
          reason: selectedReason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User deactivated successfully ❌");
      setSelectedUser(null);
      setSelectedReason("");
    } catch (err) {
      handleError(err, "Failed to deactivate user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-2xl relative">
      <h2 className="text-xl font-bold mb-4 text-red-600">Deactivate User</h2>

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
        <label className="block mb-1 font-semibold">Select User</label>
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
            <span className="font-semibold">Already Deactivated:</span>{" "}
            {selectedUser.is_Deactive
              ? `Yes (${selectedUser.deactivate_reason})`
              : "No"}
          </p>
        </div>
      )}

      {/* Select Reason */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Reason</label>
        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Reason --</option>
          {reasons.map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Deactivate Button */}
      <button
        onClick={handleDeactivate}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Deactivate"}
      </button>
    </div>
  );
};

export default DeactivateUser;
