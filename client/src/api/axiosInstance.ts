import { useOrganization } from "@/store/organization.store";
import axios from "axios";

const URL= import.meta.env.VITE_BE_URL;

const axiosInstance = axios.create({ baseURL: URL, withCredentials: true });

axiosInstance.interceptors.request.use((config) => {
    const organizationId = useOrganization.getState().selectedOrganization;

    if(organizationId){
        config.headers['x-organization-id'] = organizationId; 
    }

    return config;
})

export default axiosInstance;