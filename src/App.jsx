import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Authentication, { action as authAction } from "./pages/Authenticate";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import { action as logoutAction } from "./pages/Logout";
import EditUser from "./pages/EditUser";
import { UserDetailsLoader } from "./loaders/UserDetailsLoader";
import { action as EditUserAction} from "../src/pages/EditUser"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      id: "root",
      children: [
        { index: true, element: <Navigate to="users" replace /> },
        { path: "users", element: <UserList /> },
        {
          path: "users/:id",
          element: <EditUser />,
          loader: UserDetailsLoader,
          id: "edit-user",
        },
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
          ],
        },
        {
          path: "/logout",
          action: logoutAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
