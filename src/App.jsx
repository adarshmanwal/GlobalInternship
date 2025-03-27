import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // errorElement: <Error></Error>,
      // loader: tokenLoader,
      id: "root",
      children: [
        { index: true, element: <Home />, id: "home" },
        // {
        //   path: "profile",
        //   element: <Profile />,
        //   loader: ProfileLoader,
        //   id: "profile",
        // },
        // {
        //   path: "shops/:id",
        //   element: <ShopDetails />,
        //   loader: shopDetailsLoader,
        //   id: "shop-details",
        // },
        // {
        //   path: "auth",
        //   element: <Authentication />,
        //   action: (args) => authAction({ ...args, context: { setUserData } }),
        //   children: [
        //     { index: true, element: <Navigate to="login" replace /> },
        //     {
        //       path: "login",
        //       element: <Login />,
        //       action: (args) =>
        //         authAction({ ...args, context: { setUserData } }),
        //     },
        //     {
        //       path: "signup",
        //       element: <SignUp />,
        //       action: (args) =>
        //         authAction({ ...args, context: { setUserData } }),
        //     },
        //     {
        //       path: "accept-invite",
        //       element: <InviteSignup></InviteSignup>
        //     }
        //   ],
        // },
        // {
        //   path: "/logout",
        //   action: logoutAction,
        // },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
