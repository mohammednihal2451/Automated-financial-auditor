import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("user/profile/");
      setUser(res.data);
      setName(res.data.name);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put("user/profile/", { name });
      setMessage("Profile updated successfully");
      setUser(res.data);
    } catch (err) {
      setMessage("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-4">
          <label className="text-sm text-slate-500">Email</label>
          <p className="font-medium">{user.email}</p>
        </div>

        <div className="mb-4">
          <label className="text-sm text-slate-500">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Update Profile
        </button>

        {message && (
          <p className="mt-3 text-sm text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;