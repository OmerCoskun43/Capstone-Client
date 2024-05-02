/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../services/useBlogCalls";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const { blogs, comments } = useSelector((state) => state.blog);
  // const { user, token } = useSelector((state) => state.auth);

  // console.log("token :>> ", token);
  // console.log("user :>> ", user);

  const { getBlogs, getComments } = useBlogCalls();

  useEffect(() => {
    getBlogs();
    getComments();
  }, []);

  return (
    <div>
      {/* <div className="pt-20 pb-4 flex flex-wrap gap-4 justify-center items-center ">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            blogComments={comments.filter((comment) => {
              comment?.blogId === blog?._id;
             
            })}
          />
        ))}
      </div> */}
      <div className="pt-20 pb-4 flex flex-wrap gap-4 justify-center items-center ">
        {blogs?.map((blog) => {
          const filteredComments = comments.filter(
            (comment) => comment.blogId === blog._id
          );
          // console.log("Filtered comments:", filteredComments);
          return (
            <BlogCard
              key={blog._id}
              blog={blog}
              blogComments={filteredComments}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
