
// const handleTokenExpiration = async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to an expired access token
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//             // Refresh the access token
//             const accessToken = await refreshAccessToken();

//             // Update the access token in the request headers
//             originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//             // Retry the original request with the new access token
//             return instance(originalRequest);
//         } catch (error) {
//             // If refreshing the access token fails, redirect to the login page
//             console.error('Failed to refresh access token:', error);
//             history.push('/login');
//             throw error;
//         }
//     }

//     // For other errors, simply throw the error
//     throw error;
// };

// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if (error.response && error.response.status === 401) {
//             try {
//                 // Handle token expiration
//                 return handleTokenExpiration(error);
//             } catch (error) {
//                 // Handle the error (e.g., redirect to login page)
//                 console.error('Failed to handle token expiration:', error);
//                 history.push('/login');
//                 throw error;
//             }
//         }

//         // For other errors, simply throw the error
//         throw error;
//     }
// );
