// import { Navigate } from "react-router-dom";
import { withoutAuthentication } from "@/util";
import { userRoute } from "./user.router";
import { roleRoute } from "./role.router";
// import { homeRoutes } from "./paths";
import { studentsRoute } from "./students.router";
import { documentTypeRoute } from "./documentType.router";
import { headquarterRoute } from "./headquarter.router";

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
      // index: true,
      path: "/menu",
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
    ...documentTypeRoute,
    ...headquarterRoute,
    // {
    //   path: "*",
    //   element: <Navigate to={homeRoutes.home} replace />,
    // },
  ],
};
