import { RouteObject } from "react-router-dom";
import { withoutAuthentication } from "@/util";
import { documentTypeRoutes } from "./paths";

export const documentTypeRoute: RouteObject[] = [
  {
    path: documentTypeRoutes.get,
    async lazy() {
      const [{ DocumentTypeListProvider }, { DocumentListPage }] =
        await Promise.all([
          import(
            /* webpackChunkName: "LazyDocumentTypeListProvider" */ "@/pages/documentType/list/context"
          ),
          import(
            /* webpackChunkName: "LazyDocumentListPage" */ "@/pages/documentType/list"
          ),
        ]);
      return {
        Component: () => (
          <DocumentTypeListProvider>
            <DocumentListPage />
          </DocumentTypeListProvider>
        ),
      };
    },
    loader: withoutAuthentication,
  },
  {
    path: documentTypeRoutes.create,
    async lazy() {
      const { DocumentTypeCreateUpdatePage } = await import(
        /* webpackChunkName: "LazyDocumentCreatePage" */ "@/pages/documentType/createUpdate"
      );
      return { Component: DocumentTypeCreateUpdatePage };
    },
    loader: withoutAuthentication,
  },
  {
    path: documentTypeRoutes.update,
    async lazy() {
      const { DocumentTypeCreateUpdatePage } = await import(
        /* webpackChunkName: "LazyDocumentUpdatePage" */ "@/pages/documentType/createUpdate"
      );
      return { Component: DocumentTypeCreateUpdatePage };
    },
    loader: withoutAuthentication,
  },
];
