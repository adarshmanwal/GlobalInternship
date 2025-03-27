import { useState } from "react";
import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { tokenLoader } from "./utils/auth";
import Authentication,{ action as authAction } from "./pages/Authenticate";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { HomePageLoaders } from "./loaders/HomePageLoader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // errorElement: <Error></Error>,
      loader: tokenLoader,
      id: "root",
      children: [
        { index: true, element: <Home />,loader: HomePageLoaders, id: "home" },
        {
          path: "auth",
          element: <Authentication />,
          action: authAction,
          children: [
            { index: true, element: <Navigate to="login" replace /> },
            {
              path: "login",
              element: <Login />,
              action: authAction,
            },
            {
              path: "signup",
              element: <SignUp />,
              // action: (args) =>
              //   authAction({ ...args, context: { setUserData } }),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
