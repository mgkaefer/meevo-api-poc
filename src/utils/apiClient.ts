
import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const getToken = async (): Promise<any> => {
  try {
    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_CLIENT_ID);
    params.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
    params.append("grant_type", "client_credentials");

    const response = await apiClient.post("", params);
    console.log("Token response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

export const createApiClientWithToken = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
