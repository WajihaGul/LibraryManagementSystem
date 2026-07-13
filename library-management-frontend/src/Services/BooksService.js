import axiosInstance from "../api/axiosInstance";

export const getAllBooks = async()=>{
    const response = await(axiosInstance.get("/book"));
    return response.data;
};

export const getBookssByID = async(id)=>{
    const response = await(axiosInstance.get(`/book/${id}`));
    return response.data;
};

export const createABook = async(bookData)=>{
    const response = await(axiosInstance.post("/book",bookData));
    return response.data;
};

export const editBook = async(id, bookData)=>{
    const response = await(axiosInstance.put(`/book/${id}`, bookData));
    return response.data;
}

export const deleteABook = async(id)=>{
    const response = await(axiosInstance.delete(`/book/${id}`));
    return response.data;
}