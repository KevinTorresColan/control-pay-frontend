import { lazy } from "react";
import { loginRoutes } from "./paths";
import { withAuthentication } from "@/util";

const LoginDasboard = lazy(
  () => import(/* webpackChunkName: "LoginLazy" */ "@/pages/login/page"),
);

export const logindRoute = {
  path: loginRoutes.signIn,
  loader: withAuthentication,
  element: <LoginDasboard />,
};
