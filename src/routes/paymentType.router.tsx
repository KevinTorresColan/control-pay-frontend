import { RouteObject } from "react-router-dom";
import { withoutAuthentication } from "@/util";
import { paymentTypeRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { PaymentTypeCreateUpdatePage } = await import(
    /* webpackChunkName: "LazyPaymentTypeCreateUpdatePage" */ "@/pages/paymentType/pages/createUpdate"
  );
  return { Component: PaymentTypeCreateUpdatePage };
};

export const paymentTypeRoute: RouteObject[] = [
  {
    path: paymentTypeRoutes.get,
    async lazy() {
      const [{ PaymentTypeListProvider }, { PaymentTypeListPage }] =
        await Promise.all([
          import(
            /* webpackChunkName: "LazyPaymentTypeListProvider" */ "@/pages/paymentType/pages/list/context"
          ),
          import(
            /* webpackChunkName: "LazyPaymentTypeListPage" */ "@/pages/paymentType/pages/list"
          ),
        ]);
      return {
        Component: () => (
          <PaymentTypeListProvider>
            <PaymentTypeListPage />
          </PaymentTypeListProvider>
        ),
      };
    },
    loader: withoutAuthentication,
  },
  {
    path: paymentTypeRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
  {
    path: paymentTypeRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
];
