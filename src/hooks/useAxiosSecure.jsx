

import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router'

const axiosSecure = axios.create({
  baseURL : 'http://localhost:3000'
})

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(config => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      async (error) => {
        console.log(error);

        const statusCode = error.response?.status;
        console.log("STATUS:", statusCode);

        if (statusCode === 401 || statusCode === 403) {
          await logout();
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosSecure;
}

export default useAxiosSecure;