import axios from "axios";

const axiosInstant = axios.create({

    baseURL: `https://newspaper-server-fawn.vercel.app`
})

const useAxios = () => {
    return axiosInstant;

};
export default useAxios;