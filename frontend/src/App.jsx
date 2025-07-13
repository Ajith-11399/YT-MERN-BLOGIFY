import { Button } from "@/components/ui/button.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import {
  RouteAddCategory,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteBlogs,
  RouteCategoryDetails,
  RouteComment,
  RouteEditCategory,
  RouteHome,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./helpers/RouteName";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
// Blog Categories
import AddCategory from "./pages/Categories/AddCategory";
import EditCategory from "./pages/Categories/EditCategory";
import Category from "./pages/Categories/Category";
// Blogs
import Blogs from "./pages/Blogs/Blogs";
import AddBlog from "./pages/Blogs/AddBlog";
import EditBlog from "./pages/Blogs/EditBlog";
import OneDetails from "./pages/Blogs/OneDetails";
import BlogByCategory from "./pages/Blogs/BlogByCategory";
import SearchResult from "./pages/SearchResult";
import Comments from "./pages/Comments";
import User from "./pages/User";
import AuthRouteProtection from "./components/AuthRouteProtection";
import AdminOnly from "./components/AdminOnly";
import Index from "./pages/Index";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={RouteIndex} element={<Index />} />
        <Route element={<Layout />}>
          {/* Home */}
          <Route path={RouteHome} element={<Home />} />
          
          {/* Blogs */}
          <Route path={RouteBlogDetails()} element={<OneDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />

          {/* Auth Route Protection */}
          <Route element={<AuthRouteProtection />}>
            
            {/* Profile */}
            <Route path={RouteProfile} element={<Profile />} />
            
            {/* Blogs */}
            <Route path={RouteBlogs} element={<Blogs />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
            
            {/* Comments */}
            <Route path={RouteComment} element={<Comments />} />
          
          </Route>

          {/* Admin Only */}
          <Route element={<AdminOnly />}>
          
            {/* Blog Categories */}
            <Route path={RouteCategoryDetails} element={<Category />} />
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
          
            {/* User */}
            <Route path={RouteUser} element={<User />} />
          
          </Route>

        </Route>
        {/* Authentication */}
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
  
      </Routes>
    </>
  );
}

export default App;
