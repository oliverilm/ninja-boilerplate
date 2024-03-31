import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../pages/layout/RootLayout";
import { MainPage } from "../pages/main/MainPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
            path: "",
            element: <MainPage />
        },
      ]
    },
  ]);

  export function RouteProvider() {
    return <RouterProvider router={router} />
  }