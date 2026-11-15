import axios from "axios";

export const jpAxios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // headers: {
    //     Authorization: "Bearer 15488887dfdtgr986846 ...",
    //     "Content-Type": "application/json",
    // },
    timeout: 5000,
    timeoutErrorMessage: 'ERROR'
})