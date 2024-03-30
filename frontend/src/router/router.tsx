import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/layout/RootLayout";


const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
            path: "",
            element: <div>root page content</div>
        },
      ]
    },
  ]);

  export function RouteProvider() {
    return <RouterProvider router={router} />
  }