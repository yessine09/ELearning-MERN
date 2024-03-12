import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
})

// Set Authorization header in each request
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token')
    // const refreshToken = Cookies.get('refresh');

    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', refreshToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // // Include the refresh token in the request headers
    // if (refreshToken) {
    //   config.headers['X-Refresh-Token'] = refreshToken;
    // }

    return config
  },
  (error) => Promise.reject(error),
)

// // Interceptor to handle token expiration errors
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to an expired access token
//     if (error.response.status === 400 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // try {
//       //   // Request a new access token using the refresh token
//       //   const response = await instance.post('/auth/refresh_token', {
//       //     refresh_token: Cookies.get('refresh'),
//       //   });

//       //   const { access_token: newAccessToken } = response.data;

//       //   // Update the access token in the cookies
//       //   Cookies.set('access_token', newAccessToken);

//       //   // Retry the failed request with the new access token
//       //   originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//       //   return instance(originalRequest);
//       // } catch (error) {
//       //   // Handle the error (e.g., redirect to login page)
//       //   console.error('Failed to refresh access token:', error);
//       //   // Perform necessary actions based on your application's requirements

//       //   window.location.href = '/auth/login';
//       //   throw error;
//       // }
//     }

//     // For other errors, simply throw the error
//     throw error;
//   }
// );

// Log the refresh token value
// console.log('Refresh Token:', Cookies.get('refresh'));
export default instance
