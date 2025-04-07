import axios from "../../config/axiosConfig";

export const signupRequest = async ({ name, email, password }) => {
    try {
        const response = await axios.post('/auth/signup', {
            name, 
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export const loginRequest = async ({ email, password }) => {
    try {
       const response = await axios.post('/auth/login', {
        email,
        password
       }) 
       return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}