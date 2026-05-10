// src/pages/UploadPage.js

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadCSV } from '../services/uploadService';

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const handleFileChange = (f) => {
    if (!f) return;
    if (!f.name.endsWith('.csv')) { setError('Only CSV files are allowed.'); return; }
    setError(''); setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFileChange(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) { setError('Please select a CSV file.'); return; }
    setLoading(true); setError('');
    try {
      await uploadCSV(file);
      // ✅ Go straight to dashboard — report is stored in DB under this user
      navigate('/dashboard');
    } catch (err) {
      setError(err.error || 'Upload failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-lg p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">📂</div>
          <h2 className="text-2xl font-bold text-slate-800">Upload CSV File</h2>
          <p className="text-slate-500 text-sm mt-1">
            Your report is saved permanently to your account and accessible anytime.
          </p>
        </div>

        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors mb-4
            ${dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
        >
          <input ref={inputRef} type="file" accept=".csv"
            onChange={e => handleFileChange(e.target.files[0])} className="hidden" />
          {file ? (
            <div>
              <p className="text-2xl mb-2">📄</p>
              <p className="font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB — Click to change</p>
            </div>
          ) : (
            <div>
              <p className="text-3xl mb-2">⬆️</p>
              <p className="text-slate-600 font-medium">Drop CSV here or click to browse</p>
              <p className="text-xs text-slate-400 mt-1">Only .csv files accepted</p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">{error}</div>
        )}

        
        

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Processing & Saving…
            </span>
          ) : 'Upload & Analyze'}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;