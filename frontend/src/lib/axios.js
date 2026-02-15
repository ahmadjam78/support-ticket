import axios from 'axios'

const api = axios.create({
    baseURL: '/',  //For Production
    // baseURL: 'http://localhost:8000',  //For Dev
    withCredentials: true,
})

export default api
