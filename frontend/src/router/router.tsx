import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/layout/RootLayout";
import { Auth } from "../pages/auth/Auth";


const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      // loader: a function that will fetch the data and return it in an object
      children: [
        {
            path: "",
            element: <div>root page content</div>
        },
        {
            path: "/auth",
            element: <Auth />
        }
      ]
    },
  ]);

  export function RouteProvider() {
    return <RouterProvider router={router} />
  }