import axios  from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    // this is for storing cookie
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json'
    },

})