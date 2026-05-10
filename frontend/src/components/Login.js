// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = ({ onSuccess, standalone = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsLoading(true);

  try {
    const res = await login(formData); // 🔥 CALL BACKEND

    // Save token
    localStorage.setItem('token', res.token);

    // Optional: store user
    localStorage.setItem('user', JSON.stringify({
      username: formData.email
    }));

    setIsLoading(false);

    if (onSuccess) {
      onSuccess();
    } else {
    navigate('/upload');
    }

  } catch (err) {
    setIsLoading(false);

    setErrors({
      api: err.response?.data?.error || 'Login failed'
    });
  }
};

  // If used as standalone page, wrap with full-screen container
  if (standalone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <LoginForm {...{ formData, errors, isLoading, handleChange, handleSubmit }} />
        </div>
      </div>
    );
  }

  return <LoginForm {...{ formData, errors, isLoading, handleChange, handleSubmit }} />;
};

// Extracted form to avoid duplication
const LoginForm = ({ formData, errors, isLoading, handleChange, handleSubmit }) => (
  <form className="space-y-6" onSubmit={handleSubmit}>
    {errors.api && (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <p className="text-sm text-red-700">{errors.api}</p>
      </div>
    )}
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={`mt-1 w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          placeholder="••••••"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>
    </div>
    <div className="flex items-center justify-between">
      <label className="flex items-center">
        <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
        <span className="ml-2 text-sm text-gray-900">Remember me</span>
      </label>
      <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
    </div>
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70"
    >
      {isLoading ? (
        <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        'Sign in'
      )}
    </button>
  </form>
);

export default Login;