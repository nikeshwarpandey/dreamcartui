import axios from "axios";
import { getJwt } from "../services/userServices";
import config from "../config.json"
const BaseURL = '/api';

const instance = axios.create({
    baseURL: `${config.backendURL}/api`//BaseURL
});

// Add a request interceptor to include the JWT token
instance.interceptors.request.use(
    (config) => {
        const token = getJwt();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;