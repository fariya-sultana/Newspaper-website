import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(res => res, error => {
        const status = error?.response?.status;
        if (status === 403) {
            navigate('/forbidden');
        } else if (status === 401) {
            logOut().then(() => {
                navigate('/login')
            }).catch(() => { })
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;