import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ActivateUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(false);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupUser, setPopupUser] = useState("");
  const [popupAmount, setPopupAmount] = useState("");

  // Error state
  const [errors, setErrors] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("Admin_token");

  // 🔹 Products state (so we can update quantity dynamically)
  const [products, setProducts] = useState([
    {
      id: "p1",
      name: "Mivaan Herb Capsule(60 Cap) 500g",

      mrp: 2083.0,
      dp: 1670.0,
      bv: 16.7,
      quantity: 1,
    },
  ]);

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

  // Activate User API
  const handleActivate = async () => {
    if (!selectedUser || !selectedProduct) {
      toast.error("Please select user and product");
      return;
    }

    // Find product object
    const product = products.find((p) => p.id === selectedProduct);

    if (!product) {
      toast.error("Invalid product selected");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}/admin/activate`,
        {
          MyuserId: selectedUser.userId,
          productId: product.id,
          Other_userId: selectedUser.referred_by, // 👈 sending selected user's ID
          quantity: product.quantity,
          name: product.name,
          mrp: product.mrp,
          dp: product.dp,
          bv: product.bv,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User activated successfully 🚀");
      setSelectedUser(null);
      setSelectedProduct("");
    } catch (err) {
      handleError(err, "Activation failed");
    } finally {
      setLoading(false);
    }
  };

  // Add Balance API
  const handleAddBalance = async () => {
    if (!popupUser || !popupAmount) {
      toast.error("Please select user and enter amount");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}/admin/addbalance`,
        { userId: popupUser, amount: Number(popupAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Balance added successfully 💰");
      setShowPopup(false);
      setPopupUser("");
      setPopupAmount("");
    } catch (err) {
      handleError(err, "Failed to add balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-2xl relative">
      {/* Add Balance Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        + Add Balance
      </button>

      <h2 className="text-xl font-bold mb-4">Activate User</h2>

      {/* 🔹 Error Display Box */}
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

      {/* Wallet Balance */}
      {selectedUser && (
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Wallet Balance</label>
          <input
            type="text"
            value={selectedUser.balance}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
      )}

      {/* Select Product */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Product</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (MRP: {p.mrp}, DP: {p.dp}, BV: {p.bv})
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Input (only shows when a product is selected) */}
      {selectedProduct && (
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Quantity</label>
          <input
            type="number"
            min="1"
            value={
              products.find((p) => p.id === selectedProduct)?.quantity || 1
            }
            onChange={(e) => {
              const qty = Math.max(1, Number(e.target.value)); // prevent 0 or negative
              const updated = products.map((p) =>
                p.id === selectedProduct ? { ...p, quantity: qty } : p
              );
              setProducts(updated);
            }}
            className="w-full border p-2 rounded"
          />

          {/* 🔹 Show Live Total */}
          <p className="mt-2 text-sm text-gray-700">
            Total:{" "}
            <span className="font-bold">
              ₹
              {products.find((p) => p.id === selectedProduct)?.dp *
                products.find((p) => p.id === selectedProduct)?.quantity}
            </span>
          </p>
        </div>
      )}

      {/* Activate Button */}
      <button
        onClick={handleActivate}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Activate"}
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add Balance</h3>

            {/* Select User */}
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Select User</label>
              <select
                value={popupUser}
                onChange={(e) => setPopupUser(e.target.value)}
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

            {/* Amount */}
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Amount</label>
              <input
                type="number"
                value={popupAmount}
                onChange={(e) => setPopupAmount(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter amount"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBalance}
                disabled={loading}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Money"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivateUser;
