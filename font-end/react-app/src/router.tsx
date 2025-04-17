import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import UserList from './pages/secondPages/userList';
import ErrorPage from './error-page'

import {
    createBrowserRouter,
    redirect,
  } from "react-router";

  // 通过检查zustand里面的token是否为空来判断是否已经登录
import useSystemStore from './store/system.store';
const {token} = useSystemStore.getState();

export const router = createBrowserRouter([
    {
      path: "/",
      element:token ?   <Login></Login> : <Home></Home> ,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "userList",
          element: <UserList></UserList>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    }
    
  ]);
