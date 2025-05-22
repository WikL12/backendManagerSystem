import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import UserList from './pages/secondPages/userList';
import ChatRoom from './pages/secondPages/chatRoom';
import FileUpload from './pages/secondPages/fileUpload';
import ErrorPage from './error-page'

import {
    createBrowserRouter,
    redirect,
  } from "react-router";

  // 通过检查zustand里面的token是否为空来判断是否已经登录
import useSystemStore from './store/system.store';
import TodoList from './pages/secondPages/toDolist';
const {token} = useSystemStore.getState();

export const router = createBrowserRouter([
    {
      path: "/",
      element:token ?   <Login></Login> : <Home></Home> ,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          label:'用户列表',
          key:'1',
          path: "userList",
          element: <UserList></UserList>,
        },
        {
          label:'待办事项',
          key:'2',
          path: "todolist",
          element: <TodoList></TodoList>,
        },
        {
          label:'聊天室',
          key:'3',
          path: "chatRoom",
          element: <ChatRoom></ChatRoom>,
        },
        {
          label:'文件上传',
          key:'3',
          path: "fileUpload",
          element: <FileUpload></FileUpload>,
        },
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
