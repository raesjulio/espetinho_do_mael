import axios from "axios";

export const api = axios.create({
    baseURL: "https://espetinho-do-mael.vercel.app/api"
})