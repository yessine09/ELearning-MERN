import { redirect } from "react-router-dom";
import instance from "../utils/axios";

export const refreshAccessToken = async () => {
    try {
        const response = await instance.post('/refresh_token');
        const { token } = response.data.data;
        return token;
    } catch (error) {
        // Handle the error (e.g., redirect to login page)
        console.error('Failed to refresh access token:', error);
        redirect('/login')
        throw error;
    }
};