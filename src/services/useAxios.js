import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { token } = useSelector((state) => state.auth);

  const axiosPublic = axios.create({
    baseURL: baseUrl,
  });

  const axiosWithToken = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosPublic, axiosWithToken };
};

export default useAxios;
