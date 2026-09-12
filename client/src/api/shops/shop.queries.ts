import { useQuery } from "@tanstack/react-query";
import { getShops } from "./shop.api";

export const FetchShops = () => {
    return useQuery({
        queryKey: ["shops"],
        queryFn: getShops,
    });
};