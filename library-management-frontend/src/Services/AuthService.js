import axiosInstance from "../api/axiosInstance";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/Authorize/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/Authorize/register", userData);
  return response.data;
};