import { withoutAuthentication } from "@/util";
import { studentsRoutes } from "./paths";

const loadCreateUpdatePage = async () => {
  const { StudentCreateUpdatePage } = await import(
    /* webpackChunkName: "LazyStudentCreateUpdatePage" */ "@/pages/student/pages/createUpdate"
  );
  return { Component: StudentCreateUpdatePage };
};

export const studentsRoute = [
  {
    path: studentsRoutes.get,
    async lazy() {
      const [{ StudentListProvider }, { StudentListPage }] = await Promise.all([
        import(
          /* webpackChunkName: "LazyStudentListProvider" */ "@/pages/student/pages/list/context"
        ),
        import(
          /* webpackChunkName: "LazyStudentListPage" */ "@/pages/student/pages/list"
        ),
      ]);
      return {
        Component: () => (
          <StudentListProvider>
            <StudentListPage />
          </StudentListProvider>
        ),
      };
    },
    loader: withoutAuthentication,
  },
  {
    path: studentsRoutes.create,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
  {
    path: studentsRoutes.update,
    lazy: loadCreateUpdatePage,
    loader: withoutAuthentication,
  },
];
