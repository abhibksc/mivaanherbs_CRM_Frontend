import React, { useEffect, useState } from "react";
import axios from "axios";

const FundRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const Admin_token = localStorage.getItem("Admin_token");

  const fetchFundRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/all-fundRequests`,
        {
          headers: {
            Authorization: `Bearer ${Admin_token}`,
          },
        }
      );
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error fetching fund requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // Replace this with your actual API endpoint
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/update-fundRequest/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${Admin_token}`,
          },
        }
      );

      // Update local state
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      console.error(`Error updating status to ${newStatus}:`, err);
    }
  };

  useEffect(() => {
    fetchFundRequests();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Wallet Fund Requests</h2>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-gray-500">No fund requests found.</div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-indigo-900 text-white">
              <tr>
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Screenshot</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Requested At</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="py-2 px-4">
                    <div className="font-medium">{req.user?.full_name}</div>
                    <div className="text-sm text-gray-500">{req.user?.email}</div>
                    <div className="text-sm text-gray-500">{req.user?.mobile}</div>
                  </td>
                  <td className="py-2 px-4">₹{req.amount}</td>
                  <td className="py-2 px-4">
                    <a
                      href={req.screenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      View Screenshot
                    </a>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-sm">
                    {new Date(req.requested_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(req._id, "Approved")}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(req._id, "Rejected")}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {req.status === "Approved" && (
                      <span className="text-green-700 text-sm font-semibold">
                        Approved
                      </span>
                    )}

                    {req.status === "Rejected" && (
                      <span className="text-red-700 text-sm font-semibold">
                        Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FundRequestList;
