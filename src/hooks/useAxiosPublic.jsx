import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://contestverse-server.vercel.app/'
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;