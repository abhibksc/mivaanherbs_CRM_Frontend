import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import GeneratePincodeModal from "./GeneratePincode";

const AllPincodes = () => {
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  const token = localStorage.getItem("Admin_token");

  const fetchPincodes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/pincodes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPincodes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching pincodes:", error);
      toast.error("Failed to load pincode data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPincodes();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">All Generated Pincodes</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold"
        >
          + Generate Pincode
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
        </div>
      ) : pincodes.length === 0 ? (
        <p className="text-center text-gray-500">No pincode entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2 text-left">Username</th>
                <th className="border px-4 py-2 text-left">Pincode</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {pincodes.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.username}</td>
                  <td className="border px-4 py-2">{item.pincode}</td>
                  <td className="border px-4 py-2 capitalize text-green-600 font-semibold">
                    {item.status}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <GeneratePincodeModal
          onClose={() => {
            setIsModalOpen(false);
            fetchPincodes(); // refresh after modal closes
          }}
        />
      )}
    </div>
  );
};

export default AllPincodes;
