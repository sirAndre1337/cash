import axios from "axios"
import { parseCookies, destroyCookie } from "nookies";

const { token } = parseCookies();

const api = axios.create({
    baseURL: 'http://localhost:3001'
})

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export { api }