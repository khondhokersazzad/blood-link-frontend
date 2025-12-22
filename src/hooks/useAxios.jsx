import axios from 'axios';

const useAxios = () => {
  const axiosInstance = axios.create({
  baseURL: 'https://blood-link-six-kappa.vercel.app',
 
});
  return axiosInstance;
};

export default useAxios;