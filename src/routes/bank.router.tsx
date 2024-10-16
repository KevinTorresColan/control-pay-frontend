import { RouteObject } from "react-router-dom";
import { withoutAuthentication } from "@/util";
import { bankRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { BankCreateUpdatePage } = await import(
    /* webpackChunkName: "LazyBankCreateUpdatePage" */ "@/pages/bank/pages/createUpdate"
  );
  return { Component: BankCreateUpdatePage };
};

export const bankRoute: RouteObject[] = [
  {
    path: bankRoutes.get,
    async lazy() {
      const [{ BankListProvider }, { BankListPage }] = await Promise.all([
        import(
          /* webpackChunkName: "LazyBankListProvider" */ "@/pages/bank/pages/list/context"
        ),
        import(
          /* webpackChunkName: "LazyBankListPage" */ "@/pages/bank/pages/list"
        ),
      ]);
      return {
        Component: () => (
          <BankListProvider>
            <BankListPage />
          </BankListProvider>
        ),
      };
    },
    loader: withoutAuthentication,
  },
  {
    path: bankRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
  {
    path: bankRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
];
