import { useNavigate } from "react-router-dom";
import { userRoutes } from "@/routes";

export const UserListPage = () => {
  const navigate = useNavigate();
  const navegar = () => navigate(userRoutes.create);

  return (
    <>
      <h1>UserListPage</h1>
      <button onClick={navegar}>Crear Usuario</button>
    </>
  );
};
