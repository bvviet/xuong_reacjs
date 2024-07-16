// src/services/axiosConfig.ts
import axios from "axios";

const configureAxios = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            config.headers["Authorization"] = token ? "Bearer " + token : null;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default configureAxios;
