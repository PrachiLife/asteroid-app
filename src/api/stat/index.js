import { httpClient } from "../httpClient";

export async function fetchStatDetails(payload) {
 const response = await httpClient.get("feed", {
    params: {
        ...payload,
        api_key : import.meta.env.VITE_API_KEY,
    },
 });
 return response.data;
}