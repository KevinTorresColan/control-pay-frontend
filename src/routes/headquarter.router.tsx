import { RouteObject } from "react-router-dom";
import { withoutAuthentication } from "@/util";
import { headquarterRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { HeadquarterCreateUpdatePage } = await import(
    /* webpackChunkName: "LazyHeadquarterCreateUpdatePage" */ "@/pages/headquarter/pages/createUpdate"
  );
  return { Component: HeadquarterCreateUpdatePage };
};

export const headquarterRoute: RouteObject[] = [
  {
    path: headquarterRoutes.get,
    async lazy() {
      const [{ HeadquarterListProvider }, { HeadquarterListPage }] =
        await Promise.all([
          import(
            /* webpackChunkName: "LazyHeadquarterListProvider" */ "@/pages/headquarter/pages/list/context"
          ),
          import(
            /* webpackChunkName: "LazyHeadquarterListPage" */ "@/pages/headquarter/pages/list"
          ),
        ]);
      return {
        Component: () => (
          <HeadquarterListProvider>
            <HeadquarterListPage />
          </HeadquarterListProvider>
        ),
      };
    },
    loader: withoutAuthentication,
  },
  {
    path: headquarterRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
  {
    path: headquarterRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
];
