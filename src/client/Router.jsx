import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Test from "./components/Test";

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
    },
    {
      path: "/:username/profile",
      element: <Test />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
