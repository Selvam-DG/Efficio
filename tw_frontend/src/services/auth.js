import axios from "./axios";

export const loginUser = async(username, password) =>{
    const result = await axios.post('/auth/login/', {username, password});
    return result.data;
};