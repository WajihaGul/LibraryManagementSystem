import axiosInstance from "../api/axiosInstance";

export const getAllBorrowRecords = async()=>{
    const response = await(axiosInstance.get("/borrowrecords"));
    return response.data;
};

export const getMyBorrowRecords = async()=>{
    const response = await(axiosInstance.get("/borrowrecords/myBorrowRecords"));
    return response.data;
};

export const getBorrowRecordsByID = async(id)=>{
    const response = await(axiosInstance.get(`/borrowrecords/${id}`));
    return response.data;
};

export const BorrowABook = async(bookId)=>{
    const response = await(axiosInstance.post("/borrowrecords",{bookId}));
    return response.data;
};

export const editBorrowRecords = async(id)=>{
    const response = await(axiosInstance.put(`/borrowrecords/${id}`));
    return response.data;
}
