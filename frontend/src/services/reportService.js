// src/services/reportService.js  — FULL FILE (replace existing)

import API from './api';

export const listReports = async () => {
  const res = await API.get('reports/');
  return res.data;
};

export const getReport = async (reportId) => {
  const res = await API.get(`report/${reportId}/`);
  return res.data;
};

export const getIssues = async (reportId) => {
  const res = await API.get(`report/${reportId}/issues/`);
  return res.data;
};

export const getFrauds = async (reportId) => {
  const res = await API.get(`report/${reportId}/frauds/`);
  return res.data;
};