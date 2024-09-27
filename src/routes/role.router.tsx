import { withoutAuthentication } from "@/util";
import { roleRoutes } from "./paths";

export const roleRoute = [
  {
    path: roleRoutes.get,
    async lazy() {
      const { RoleListPage } = await import(
        /* webpackChunkName: "LazyRoleList" */ "@/pages/role/list"
      );
      return { Component: RoleListPage };
    },
    loader: withoutAuthentication,
  },
  {
    path: roleRoutes.create,
    element: <h1>Crear roles</h1>,
    loader: withoutAuthentication,
  },
  {
    path: roleRoutes.update,
    element: <h1>Actualizar roles</h1>,
    loader: withoutAuthentication,
  },
];
