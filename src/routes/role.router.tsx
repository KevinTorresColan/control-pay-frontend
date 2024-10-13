import { RouteObject } from "react-router-dom";
import { withoutAuthentication } from "@/util";
import { roleRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { RoleCreateUpdatePage } = await import(
    /* webpackChunkName: "LazyRoleCreateUpdatePage" */ "@/pages/role/pages/createUpdate"
  );
  return { Component: RoleCreateUpdatePage };
};

export const roleRoute: RouteObject[] = [
  {
    path: roleRoutes.get,
    async lazy() {
      const [{ RoleListProvider }, { RoleListPage }] = await Promise.all([
        import(
          /* webpackChunkName: "LazyRoleListProvider" */ "@/pages/role/pages/list/context"
        ),
        import(
          /* webpackChunkName: "LazyRoleListPage" */ "@/pages/role/pages/list"
        ),
      ]);
      return {
        Component: () => (
          <RoleListProvider>
            <RoleListPage />
          </RoleListProvider>
        ),
      };
    },
    loader: withoutAuthentication,
  },
  {
    path: roleRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
  {
    path: roleRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
];
