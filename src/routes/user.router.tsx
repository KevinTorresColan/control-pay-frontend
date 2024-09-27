import { withoutAuthentication } from "@/util";
import { userRoutes } from "./paths";

export const userRoute = [
  {
    path: userRoutes.get,
    async lazy() {
      const { UserListPage } = await import(
        /* webpackChunkName: "LazyUserList" */ "@/pages/user/list"
      );
      return { Component: UserListPage };
    },
    loader: withoutAuthentication,
  },
  {
    path: userRoutes.create,
    async lazy() {
      const { UserCreatePage } = await import(
        /* webpackChunkName: "LazyUserCreate" */ "@/pages/user/create"
      );
      return { Component: UserCreatePage };
    },
    loader: withoutAuthentication,
  },
  {
    path: userRoutes.update,
    element: <h1>Actualizar usuarios</h1>,
    loader: withoutAuthentication,
  },
];
