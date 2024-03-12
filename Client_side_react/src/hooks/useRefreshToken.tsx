import instance from "../utils/axios"
import { useAuth } from "../contexts/Auth"
export const useRefreshToken = () => {
    const refreshToken = async (userId: any, refreshToken: any) => {
        try {
            const response = await instance.post("/auth/refresh_token", {
                user: { id: userId },
                authPayload: { refreshToken },
            }, { withCredentials: true });
            const { token } = response.data.data;
            console.log(response);
            console.log(token);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div>


        </div >
    )
}
