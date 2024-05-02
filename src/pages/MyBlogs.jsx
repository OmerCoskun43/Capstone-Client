/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCardEdit";
import { useEffect } from "react";
import useBlogCalls from "../services/useBlogCalls";
const MyBlogs = () => {
  const { blogs } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const { getBlogs } = useBlogCalls();

  useEffect(() => {
    getBlogs();
  }, []);

  const myBlogs = blogs.filter((blog) => blog.userId === user._id);

  return (
    <div className="p-6">
      <h1 className="text-xl md:text-3xl text-center mb-4 text-red-600">
        My Blogs
      </h1>

      <div className="flex gap-1 md:gap-5 flex-wrap justify-center items-center">
        {myBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
