import { Cookies } from 'react-cookie';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import NavComponent from './Components/Common/Nav/Nav.component';
import HomePage from './Pages/Home/Home.page';
import RegisterPage from './Pages/Auth/Register.page';
import LoginPage from './Pages/Auth/Login.page';
import UserPage from './Pages/User/User.page';
import PostDetailsPage from './Pages/Post/PostDetails.page';
import AddPostPage from './Pages/Post/AddPost.page';
import EditPostPage from './Pages/Post/EditPost.page';
import PostByCategoryPage from './Pages/Post/PostByCategory.page';
import CategoryPage from './Pages/Category/Category.page';

const cookies = new Cookies();

function PublicRoute({ children }) {
  return <div className='min-h-screen max-w-7xl mx-auto'>
    <NavComponent role={cookies.get('token') ? cookies.get('user').role : ""}/>
    {children}
  </div>
}
function PrivateRoute({ children }) {
  return cookies.get('token')
    ? <div className='min-h-screen max-w-7xl mx-auto'>
      <NavComponent role={cookies.get('user').role}/>
      {children}
    </div>
    : <Navigate to="/" />
}

function AdminRoute({ children }) {
  return cookies.get('token') && cookies.get('user').role === "admin"
    ? <div className='max-w-7xl mx-auto'>
      <NavComponent role={"admin"}/>
      {children}
    </div>
    : <Navigate to="/" />
}
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={
        <PublicRoute>
          <HomePage />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/blog/create" element={
        <PrivateRoute>
          <AddPostPage />
        </PrivateRoute>
      } />
      <Route path="/blog/edit/:id" element={
        <PrivateRoute>
          <EditPostPage />
        </PrivateRoute>
      } />
      <Route path="/blog/:id" element={
        <PublicRoute>
          <PostDetailsPage />
        </PublicRoute>
      } />
      <Route path="/user" element={
        <PrivateRoute>
          <UserPage />
        </PrivateRoute>
      } />
      <Route path="/category" element={
        <PublicRoute>
          <PostByCategoryPage />
        </PublicRoute>
      } />
      <Route path="/admin/category" element={
        <AdminRoute>
          <CategoryPage />
        </AdminRoute>
      } />
    </>
  )
)

