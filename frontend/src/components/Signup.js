// frontend/src/components/Signup.js
import React, { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ onSuccess, standalone = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
    await signup(formData);

    setIsLoading(false);

    // ✅ Redirect to the sign‑in page, not the landing page
    navigate('/login');

  } catch (error) {
    setIsLoading(false);

    setErrors({
      api:
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed"
    });
  }
};

  // If used as standalone page, wrap with full-screen container
  if (standalone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <SignupForm {...{ formData, errors, isLoading, handleChange, handleSubmit }} />
        </div>
      </div>
    );
  }

  return <SignupForm {...{ formData, errors, isLoading, handleChange, handleSubmit }} />;
};

// Extracted form to avoid duplication (mirrors LoginForm structure)
const SignupForm = ({ formData, errors, isLoading, handleChange, handleSubmit }) => (
  <form className="space-y-6" onSubmit={handleSubmit}>
    {errors.api && (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <p className="text-sm text-red-700">{errors.api}</p>
      </div>
    )}
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      {/* Email */}
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
      {/* Password */}
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
      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`mt-1 w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
          placeholder="••••••"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>
    </div>

    {/* Signup Button with loading state */}
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70"
    >
      {isLoading ? (
        <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        'Create Account'
      )}
    </button>

    {/* Link to Login page */}
    <p className="text-center text-sm text-gray-600">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:underline font-medium">
        Sign in
      </Link>
    </p>
  </form>
);

export default Signup;