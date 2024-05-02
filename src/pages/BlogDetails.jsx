/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBlogCalls from "../services/useBlogCalls";
import { useSelector } from "react-redux";
import CommentCard from "../components/CommentCard";
const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    getOneBlog,
    getOneComments,
    likeButton,
    createComment,
  } = useBlogCalls();
  const { user } = useSelector((state) => state.auth);
  const { blog, blogComments: comments } = useSelector((state) => state.blog);

  // console.log("comments :>> ", comments);

  const [formValues, setFormValues] = useState({
    userId: "",
    blogId: "",
    comment: "",
  });

  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async (id) => {
    await likeButton(id);
    setLikeCount((prev) => prev + 1);
  };

  useEffect(() => {
    getOneBlog(id);
  }, [likeCount]);

  useEffect(() => {
    getOneComments(id);
  }, [commentCount]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment({ ...formValues, userId: user._id, blogId: blog._id });
    setCommentCount(commentCount + 1);
    setFormValues({
      userId: "",
      blogId: "",
      comment: "",
    });
  };

  return (
    <div className="pt-20 pb-10 flex flex-col md:flex-row  gap-2 justify-center ">
      <div className="w-[90%] md:w-[48%]  mx-auto relative  flex flex-col mt-2 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl ">
        <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src={blog?.image}
            alt={blog?._id}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {blog?.title}
            </h5>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-red-600">
              {blog?.categoryId?.name}
            </h5>
          </div>
          <p className=" font-sans text-base antialiased font-light leading-relaxed text-inherit text-justify indent-5 ">
            {blog?.content}
          </p>
        </div>
        <div className="p-6 pt-0 flex justify-between">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-yellow-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:bg-yellow-800 "
            type="button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>

          <div className="flex justify-end p-4 gap-4">
            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => handleLike(blog?._id)}
            >
              <span className="text-2xl font-bold text-red-600">
                {" "}
                <sup>{blog?.likes?.length} </sup>{" "}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={
                  blog?.likes?.includes(user?._id)
                    ? "text-red-600 w-6 h-6"
                    : "text-gray-600 w-6 h-6"
                }
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </div>
            <div className="flex gap-1">
              <span className="text-2xl font-bold text-red-600">
                {" "}
                <sup>{blog?.countOfVisitors?.length} </sup>{" "}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              <span className="text-2xl font-bold text-red-600">
                {" "}
                <sup>{comments?.length} </sup>{" "}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {showComments && (
        <div className="w-[90%] md:w-[48%]  mx-auto relative h-auto flex flex-col mt-2 text-gray-700 bg-blue-100 shadow-md bg-clip-border rounded-xl  ">
          <h1 className="text-2xl font-bold text-red-600 px-4 pt-2">
            Comments
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
            <textarea
              name="comment"
              id="comment"
              value={formValues.comment}
              onChange={handleChange}
              rows="10"
              cols="5"
              required
              className="rounded-lg p-2 resize-none "
              placeholder="Write your comment here... "
            ></textarea>
            <button
              type="submit"
              className="font-bold p-2 rounded-lg bg-red-600 text-white hover:bg-red-400"
            >
              Share Your Comment
            </button>
          </form>
          <div className="flex flex-col gap-2 px-4 ">
            {comments?.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                setCommentCount={setCommentCount}
                commentCount={commentCount}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
