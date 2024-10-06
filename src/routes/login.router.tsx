import { loginRoutes } from "./paths";
import { withAuthentication } from "@/util";
import { LoginPage } from "@/pages/login";

export const logindRoute = {
  path: loginRoutes.signIn,
  loader: withAuthentication,
  element: <LoginPage />,
};
