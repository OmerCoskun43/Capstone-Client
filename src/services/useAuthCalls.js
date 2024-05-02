import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import {
  deleteSuccess,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateSuccess,
} from "../features/authSlice";

const useAuthCalls = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { axiosWithToken, axiosPublic } = useAxios();

  const register = async (formValues) => {
    try {
      const { data } = await axiosPublic.post(`${baseUrl}/users`, formValues);
      navigate("/");
      // console.log("data ==>", data);
      dispatch(registerSuccess(data));
      toastSuccessNotify("User created successfully");
    } catch (error) {
      toastErrorNotify(error.response.data.error);
    }
  };

  const login = async (formValues) => {
    try {
      const { data } = await axiosPublic.post(
        `${baseUrl}/auth/login`,
        formValues
      );
      dispatch(loginSuccess(data));
      navigate("/");
      toastSuccessNotify("Login completed successfully");
    } catch (error) {
      toastErrorNotify("Login process failed");
      // console.log(error.response.data.error);
    }
  };

  const logout = async () => {
    try {
      await axiosWithToken("/auth/logout/");
      toastSuccessNotify("Logout completed successfully");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      toastErrorNotify("Logout process failed");
    }
  };

  const editProfile = async (id, formValues) => {
    try {
      const { data } = await axiosWithToken.put(`users/${id}`, formValues);
      dispatch(updateSuccess(data));
      toastSuccessNotify("Profile updated successfully");
    } catch (error) {
      toastErrorNotify("Profile update failed");
    }
  };

  const deleteProfile = async (id) => {
    try {
      await axiosWithToken.delete(`users/${id}`);
      dispatch(deleteSuccess());
      toastSuccessNotify("Profile deleted successfully");
    } catch (error) {
      toastErrorNotify("Profile delete failed");
    }
  };

  return { login, register, logout, editProfile, deleteProfile };
};

export default useAuthCalls;
