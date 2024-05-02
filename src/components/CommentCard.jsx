/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import useBlogCalls from "../services/useBlogCalls";

/* eslint-disable no-unused-vars */
const CommentCard = ({ comment, setCommentCount, commentCount }) => {
  const { user } = useSelector((state) => state.auth);
  const { deleteComment } = useBlogCalls();

  const handleDelete = (id) => {
    setCommentCount(commentCount + 1);
    deleteComment(id);
  };

  return (
    <div className="px-4 bg-white rounded-lg flex py-2 flex-col  gap-2">
      <div className="flex justify-between">
        <span>
          {comment?.userId.firstName[0].toUpperCase() +
            comment?.userId.firstName.slice(1) +
            " " +
            comment?.userId.lastName[0].toUpperCase() +
            comment?.userId.lastName.slice(1)}
        </span>
        <span>{comment?.userId.email}</span>
      </div>
      <div className="bg-gray-100  flex flex-wrap rounded-lg p-3">
        <p className=" overflow-auto break-words ">{comment?.comment}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-red-600 animate-pulse">
          {comment?.createdAt
            .replace(/\.000Z/, "")
            .replace("T", " ")
            .slice(0, 19)}
        </p>
        {!user?.isAdmin && comment?.userId._id == user?._id && (
          <button
            onClick={() => handleDelete(comment._id)}
            className="text-white bg-red-600 px-2 py-1 rounded-lg "
          >
            Delete
          </button>
        )}
        {user?.isAdmin && (
          <button
            onClick={() => handleDelete(comment._id)}
            className="text-white bg-red-600 px-2 py-1 rounded-lg "
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
