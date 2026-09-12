import { useShop } from "@/store/shop.store";
import axios from "axios";

const URL = import.meta.env.VITE_BE_URL;

const axiosInstance = axios.create({ baseURL: URL, withCredentials: true });

axiosInstance.interceptors.request.use((config) => {
    const shopId = useShop.getState().selectedShop;

    if (shopId) {
        config.headers['x-shop-id'] = shopId;
    }

    return config;
})

export default axiosInstance;