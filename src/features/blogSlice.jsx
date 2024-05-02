import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  blog: null,
  comments: [],
  blogComments: [],
  categories: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogsSuccess: (state, action) => {
      state.blogs = action.payload.data;
    },
    blogSuccess: (state, action) => {
      state.blog = action.payload;
    },
    commentsSuccess: (state, action) => {
      state.comments = action.payload.data;
    },
    blogCommentsSuccess: (state, action) => {
      state.blogComments = action.payload.data;
    },

    categoriesSuccess: (state, action) => {
      state.categories = action.payload.data;
    },
  },
});

export const {
  blogsSuccess,
  blogSuccess,
  commentsSuccess,
  blogCommentsSuccess,
  categoriesSuccess,
} = blogSlice.actions;
export default blogSlice.reducer;
