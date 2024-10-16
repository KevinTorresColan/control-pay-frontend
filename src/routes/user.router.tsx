import { RouteObject } from "react-router-dom";
import { withoutAuthentication } from "@/util";
import { userRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { UserCreateUpdatePage } = await import(
    /* webpackChunkName: "LazyUserCreateUpdatePage" */ "@/pages/user/pages/createUpdate"
  );
  return { Component: UserCreateUpdatePage };
};

export const userRoute: RouteObject[] = [
  {
    path: userRoutes.get,
    async lazy() {
      const [{ UserListProvider }, { UserListPage }] = await Promise.all([
        import(
          /* webpackChunkName: "LazyUserListProvider" */ "@/pages/user/pages/list/context"
        ),
        import(
          /* webpackChunkName: "LazyUserListPage" */ "@/pages/user/pages/list"
        ),
      ]);
      return {
        Component: () => (
          <UserListProvider>
            <UserListPage />
          </UserListProvider>
        ),
      };
    },
    loader: withoutAuthentication,
  },
  {
    path: userRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
  {
    path: userRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
];
