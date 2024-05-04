import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import BlogDetails from "../pages/BlogDetails";
import Categories from "../pages/Categories";
import Account from "../pages/Account";
import MyBlogs from "../pages/MyBlogs";
import CreateBlog from "../components/CreateBlog";

import { NavbarDefault } from "../components/Navbar";
import { Footer } from "../components/Footer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavbarDefault />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<BlogDetails />} />
        </Route>
        <Route path="/categories" element={<PrivateRouter />}>
          <Route path="" element={<Categories />} />
        </Route>
        <Route path="/account" element={<PrivateRouter />}>
          <Route path="" element={<Account />} />
        </Route>
        <Route path="/myblogs" element={<PrivateRouter />}>
          <Route path="" element={<MyBlogs />} />
        </Route>
        <Route path="/createblog" element={<PrivateRouter />}>
          <Route path="" element={<CreateBlog />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
