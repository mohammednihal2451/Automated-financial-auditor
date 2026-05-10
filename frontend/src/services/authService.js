import { registerUser, loginUser } from './api';

// SIGNUP
export const signup = async (formData) => {
  const res = await registerUser({
    username: formData.email,
    password: formData.password
  });

  return res.data;
};

// ✅ LOGIN
export const login = async (formData) => {
  const res = await loginUser({
    username: formData.email,
    password: formData.password
  });

  return res.data;
};