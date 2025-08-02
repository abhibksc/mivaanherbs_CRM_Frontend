import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GeneratePincodeModal = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  const token = localStorage.getItem("Admin_token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/allusers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch users", error);
        toast.error("Failed to load users");
      }
    };

    fetchUsers();
  }, [BASE_URL, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUsername || !pincode) {
      toast.warning("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/admin/generate-pincode`,
        {
          username: selectedUsername,
          pincode,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Pincode generated successfully");
      setSelectedUsername("");
      setPincode("");
      setStatus("active");
      onClose(); // Close modal and refresh list
    } catch (error) {
      console.error("Error generating pincode", error);
      toast.error(error?.response?.data?.message || "Failed to generate pincode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-indigo-600 text-center">
          Generate Pincode
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select User</label>
            <select
              value={selectedUsername}
              onChange={(e) => setSelectedUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Choose User --</option>
              {users.map((user) => (
                <option key={user._id} value={user.username}>
                  {user.full_name} ({user.username})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Pincode"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneratePincodeModal;
