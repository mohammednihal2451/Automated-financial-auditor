

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

// List of countries for dropdown
const countries = [
  "United States", "Canada", "United Kingdom", "India", "Australia",
  "Germany", "France", "Japan", "Brazil", "South Africa", "Other"
];

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type, message }

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("user/profile/");
      setUser(res.data);
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        mobile: res.data.mobile || "",
        location: res.data.location || "India"
      });
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load profile");
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      showToast("error", "Name is required");
      return false;
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      showToast("error", "Valid email is required");
      return false;
    }
    if (form.mobile && !/^[+]?[0-9\s\-()]{10,}$/.test(form.mobile)) {
      showToast("error", "Invalid mobile number");
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await API.put("user/profile/", {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        location: form.location
      });
      showToast("success", "Profile updated successfully");
      await fetchProfile(); // refresh user data
    } catch (err) {
      showToast("error", err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Skeleton loader
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-80"></div>
              <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 h-96"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your profile and preferences</p>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 animate-slide-in-right">
            <div className={`rounded-xl shadow-lg p-4 pr-8 ${
              toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
            }`}>
              {toast.message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PANEL – Profile Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
              <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
                {/* Cover image placeholder */}
              </div>
              <div className="relative px-6 pb-6">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white dark:ring-gray-800">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs rounded-full">
                    {user.email_verified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-4 space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <span>🚪 Logout</span>
                  <span>→</span>
                </button>
              </div>
            </div>
            {/* Stats cards removed as requested */}
          </div>

          {/* RIGHT PANEL – Edit Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transition-all">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-2xl">✏️</span>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Profile</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">👤</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">📧</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">📞</span>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">📍</span>
                    <select
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full pl-9 pr-8 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 appearance-none"
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  onClick={() => {
                    setForm({
                      name: user.name,
                      email: user.email,
                      mobile: user.mobile,
                      location: user.location || "India"
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
                * Required fields
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Profile;