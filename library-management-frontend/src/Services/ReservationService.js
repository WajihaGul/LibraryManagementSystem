import axiosInstance from "../api/axiosInstance";

export const getAllReservations = async()=>{
    const response = await(axiosInstance.get("/reservation"));
    return response.data;
};

export const getReservationsByID = async(id)=>{
    const response = await(axiosInstance.get(`/reservation/${id}`));
    return response.data;
};

export const getMyReservations = async()=>{
    const response = await(axiosInstance.get("/reservation/myReservation"));
    return response.data;
};

export const updateAReservation = async(id, reservationData)=>{
    const response = await(axiosInstance.put(`/reservation/${id}`, reservationData));
    return response.data;
}

export const bookAReservation = async(id)=>{
    const response = await(axiosInstance.post(`/reservation/${id}`));
    return response.data;
}