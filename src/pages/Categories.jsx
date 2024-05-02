/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useBlogCalls from "../services/useBlogCalls";
import BlogCard from "../components/BlogCard";
const Categories = () => {
  const { categories, blogs, comments } = useSelector((state) => state.blog);

  const { getCategories, getBlogs, getComments } = useBlogCalls();

  useEffect(() => {
    getCategories();
    getBlogs();
    getComments();
  }, []);
  const [activeButton, setActiveButton] = useState(null);
  const [filter, setFilter] = useState({});

  const handleClick = (categoryId) => {
    setActiveButton(categoryId);
    setFilter({ categoryId });
  };

  const filteredBlogs = blogs?.filter((blog) => {
    if (filter.categoryId) {
      return blog.categoryId._id == filter.categoryId;
    } else {
      return blog;
    }
  });

  return (
    <div>
      <div className="p-5 flex justify-center gap-5">
        <button
          className={`px-3 py-2 rounded-lg font-bold shadow-md ${
            activeButton === null
              ? "bg-red-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleClick(null)}
        >
          All
        </button>
        {categories?.map((category) => (
          <button
            key={category._id}
            className={`px-3 py-2 rounded-lg font-bold shadow-md ${
              activeButton === category._id
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleClick(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className=" pb-4 flex flex-wrap gap-4 justify-center items-center ">
        {filteredBlogs.length > 0 ? (
          filteredBlogs?.map((blog) => {
            const filteredComments = comments.filter(
              (comment) => comment.blogId == blog._id
            );

            return (
              <BlogCard
                key={blog._id}
                blog={blog}
                blogComments={filteredComments}
              />
            );
          })
        ) : (
          <h1 className="text-xl animate-pulse md:text-3xl text-center font-bold text-red-600">
            No blogs to show in this category...
          </h1>
        )}
      </div>
    </div>
  );
};

export default Categories;
