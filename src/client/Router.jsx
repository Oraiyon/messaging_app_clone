import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import SignUp from "./components/Signup";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
