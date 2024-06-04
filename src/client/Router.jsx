import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import SignUp from "./components/Signup";
import Login from "./components/Login";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
