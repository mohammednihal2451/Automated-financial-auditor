import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Token ${token}`;
  }

  return req;
});

export const registerUser = (data) => API.post('register/', data);
export const loginUser = (data) => API.post('login/', data);
export const getDashboard = () => API.get('dashboard/');

// 👇 EXPORT API so other services can use it
export default API;