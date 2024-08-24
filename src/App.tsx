import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { withAuthentication } from "./util";
import Dashboard from "./pages/dashboard/Dashboard";
import { LoginPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    loader: withAuthentication,
    element: <LoginPage />,
  },
  {
    path: "",
    element: <Dashboard />,
    // loader: withoutAuthentication,
    children: [
      {
        path: "/menu",
        element: <h1>Bienvenido</h1>,
        // loader: withoutAuthentication,
      },
      {
        path: "/perfiles",
        element: <h1>Perfiles</h1>,
        // loader: withoutAuthentication,
      },
      {
        path: "/perfiles2",
        element: <h1>Perfiles</h1>,
        // loader: withoutAuthentication,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
