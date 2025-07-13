import axios from "axios";

//making url dynamic because not sure what it will be on deployment
//if the base url is equal to development then we can just paste the local host
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, //send cookies with the request

});

