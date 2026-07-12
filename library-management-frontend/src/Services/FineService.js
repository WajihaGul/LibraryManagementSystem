import axiosInstance from "../api/axiosInstance";

export const getAllFineResults = async () => {
  const response = await axiosInstance.get("/fine");
  return response.data;
};

export const getMyFine = async () => {
  const response = await axiosInstance.get("/fine/myfine");
  return response.data;
};

export const payFine = async (id) => {
  const response = await axiosInstance.put(`/fine/${id}`);
  return response.data;
};
