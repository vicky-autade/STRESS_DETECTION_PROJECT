import axios from "axios";
import toast from "react-hot-toast"; 

const axiosClient = axios.create({
  baseURL: "https://stress-detection-backend.vercel.app/", // Replace with your API base URL
  withCredentials: true, // Include cookies if necessary
});

// Interceptor for handling responses
// Interceptor for handling responses
const setupAxiosInterceptors = (navigate ) => {
  axiosClient.interceptors.response.use(
    (response) => {
      // Pass successful responses
      console.log(response)
      return response;
    },
    (error) => {
      // Check for 403 error (Session Expired)
      console.log("error demo : "+error)
      return Promise.reject(error); // Pass errors to the calling function
    }
  );
};


export { axiosClient, setupAxiosInterceptors };
