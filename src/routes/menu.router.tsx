import { withoutAuthentication } from "@/util";
import { userRoute } from "./user.router";
import { roleRoute } from "./role.router";
import { Navigate } from "react-router-dom";
import { homeRoutes } from "./paths";
import { studentsRoute } from "./students.router";

export const menuRoute = {
  path: "",
  async lazy() {
    const { Dashboard } = await import(
      /* webpackChunkName: "LazyDasboard" */ "@/pages"
    );
    return { Component: Dashboard };
  },
  loader: withoutAuthentication,
  children: [
    {
      index: true,
      async lazy() {
        const { Welcome } = await import(
          /* webpackChunkName: "LazyDasboard" */ "@/pages"
        );
        return { Component: Welcome };
      },
    },
    ...userRoute,
    ...roleRoute,
    ...studentsRoute,
    {
      path: "*",
      element: <Navigate to={homeRoutes.home} replace />,
    },
  ],
};
