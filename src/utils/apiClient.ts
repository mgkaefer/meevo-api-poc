import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getToken = async (): Promise<any> => {
  try {
    const response = await apiClient.post("", {
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};
