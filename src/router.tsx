import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/login/Login";

const router = createBrowserRouter([
    {
    path: '/',
    element: <Home/>
  },
   {
    path: '/auth/login',
    element: <LoginPage/>
   }
])

export default router