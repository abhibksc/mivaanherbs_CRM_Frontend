import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL;

    axios
      .get(`${baseUrl}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL;

    axios
      .put(`${baseUrl}/admin/users/${id}`, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      })
      .then(() => {
        alert("User updated successfully!");
        navigate("/users?filter=all"); // redirect back to list
      })
      .catch((err) => {
        console.error(err);
        alert("Update failed!");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit User</h2>
      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={user.full_name || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={user.mobile || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>


          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
