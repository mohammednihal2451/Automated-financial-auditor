// frontend/src/pages/Authentication.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const navigate = useNavigate();


const handleAuthSuccess = () => {
  navigate('/upload');
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
              activeTab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
              activeTab === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {activeTab === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Welcome Back</h2>
              <Login onSuccess={handleAuthSuccess} />
            </>
          ) : (
            <>
             
              <Signup onSuccess={handleAuthSuccess} />
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Authentication;