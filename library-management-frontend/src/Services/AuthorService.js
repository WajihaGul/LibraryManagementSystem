import axiosInstance from "../api/axiosInstance";

export const getAllAuthors = async()=>{
    const response = await(axiosInstance.get("/author"));
    return response.data;
};

export const getAuthorsByID = async(id)=>{
    const response = await(axiosInstance.get(`/author/${id}`));
    return response.data;
};

export const createAuthor = async(authorData)=>{
    const response = await(axiosInstance.post("/author", authorData));
    return response.data;
}

export const updateAuthors = async(id, authorData)=>{
    const response = await(axiosInstance.put(`/author/${id}`, authorData));
    return response.data;
}

export const deleteAuthor = async(id)=>{
    const response = await(axiosInstance.delete(`/author/${id}`));
    return response.data;
}