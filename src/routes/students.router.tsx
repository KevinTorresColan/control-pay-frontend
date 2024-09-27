import { withoutAuthentication } from "@/util";
import { studentsRoutes } from "./paths";

export const studentsRoute = [
  {
    path: studentsRoutes.get,
    element: <h1>Listar estudiantes</h1>,
    loader: withoutAuthentication,
  },
  {
    path: studentsRoutes.create,
    element: <h1>Crear estudiantes</h1>,
    loader: withoutAuthentication,
  },
  {
    path: studentsRoutes.update,
    element: <h1>Actualizar estudiantes</h1>,
    loader: withoutAuthentication,
  },
];
