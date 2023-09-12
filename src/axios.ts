import axios from "axios";
const instance = axios.create(
    {
        baseURL: 'https://kinopoiskapiunofficial.tech',
        headers: {
            'X-API-KEY': '7123886c-b0f8-4320-aa1c-41f8d01e2b9c'
        },
        
    }
)
export default instance