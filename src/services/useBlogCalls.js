/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";
import {
  blogCommentsSuccess,
  blogSuccess,
  blogsSuccess,
  commentsSuccess,
  categoriesSuccess,
} from "../features/blogSlice";
import { useNavigate } from "react-router-dom";

const useBlogCalls = () => {
  const { axiosWithToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBlogs = async () => {
    try {
      const { data } = await axiosPublic.get("/blogs");
      dispatch(blogsSuccess(data));
      // toastSuccessNotify("Blogs fetched successfully");
    } catch (error) {
      toastErrorNotify("Blogs can't be fetched");
    }
  };

  const createBlog = async (formValues) => {
    try {
      await axiosWithToken.post("/blogs", formValues);
      navigate("/myblogs");
      toastSuccessNotify("Blog created successfully");
    } catch (error) {
      toastErrorNotify("Blog can't be created");
    }
  };

  const getOneBlog = async (id) => {
    try {
      const { data } = await axiosWithToken.get(`/blogs/${id}`);
      dispatch(blogSuccess(data.data));
      //   toastSuccessNotify("Blog fetched successfully");
    } catch (error) {
      toastErrorNotify("Blog can't be fetched");
    }
  };

  const editBlog = async (id, formValues) => {
    try {
      await axiosWithToken.put(`/blogs/${id}`, formValues);
      getBlogs();
      toastSuccessNotify("Blog edited successfully");
    } catch (error) {
      toastErrorNotify("Blog can't be edited");
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axiosWithToken.delete(`/blogs/${id}`);
      getBlogs();
      toastSuccessNotify("Blog deleted successfully");
    } catch (error) {
      toastErrorNotify("Something went wrong");
    }
  };

  const createComment = async (formValues) => {
    try {
      await axiosPublic.post("/comments", formValues);
      toastSuccessNotify("Comment created successfully");
    } catch (error) {
      toastErrorNotify("Comment can't be created");
    }
  };

  const getComments = async () => {
    try {
      const { data } = await axiosPublic.get(`/comments`);
      // console.log("data :>> ", data);
      dispatch(commentsSuccess(data));
      // toastSuccessNotify("Comments fetched successfully");
    } catch (error) {
      toastErrorNotify("Comments can't be fetched");
    }
  };
  const getOneComments = async (id) => {
    try {
      const { data } = await axiosWithToken.get(`/comments/blog/${id}`);

      dispatch(blogCommentsSuccess(data));
      // toastSuccessNotify("Blog Comments fetched successfully");
    } catch (error) {
      toastErrorNotify("Blog Comments can't be fetched");
    }
  };
  const deleteComment = async (id) => {
    try {
      await axiosWithToken.delete(`/comments/${id}`);
      // getOneComments(id);
      toastSuccessNotify("Comment deleted successfully");
    } catch (error) {
      toastErrorNotify("Something went wrong");
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axiosPublic.get("/categories");
      dispatch(categoriesSuccess(data));
      // toastSuccessNotify("Categories fetched successfully");
    } catch (error) {
      toastErrorNotify("Categories can't be fetched");
    }
  };

  const likeButton = async (id) => {
    try {
      const { data } = await axiosWithToken.get(`/blogs/like/${id}`);
      toastSuccessNotify(data?.message);
    } catch (error) {
      toastErrorNotify("Something went wrong");
    }
  };

  return {
    getBlogs,
    getComments,
    getOneBlog,
    getOneComments,
    likeButton,
    getCategories,
    createComment,
    deleteComment,
    editBlog,
    deleteBlog,
    createBlog,
  };
};

export default useBlogCalls;
