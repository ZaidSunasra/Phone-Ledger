import { useAuth } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "./auth.api";
import { useEffect } from "react";

export const FetchMe = () => {
    const setUser = useAuth((state) => state.setUser);
    const { data} = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    });
    useEffect(() => {
        if(data){
            setUser(data.userData)
        }
    }, [data, setUser])

    return null
};