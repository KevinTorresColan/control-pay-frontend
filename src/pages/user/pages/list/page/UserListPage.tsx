import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Breadcrumbs, Loading } from "@/components";
import { userRoutes, homeRoutes } from "@/routes";
import { FilterModule, ListTableModule } from "../modules";
import { UserListContext } from "../context";

const links = [
  { name: "Menu", href: homeRoutes.home },
  { name: "Listar usuarios" },
];

const UserListPage = () => {
  const { dataTable, isLoadingList } = useContext(UserListContext);
  const navigate = useNavigate();

  const addRegister = () => navigate(userRoutes.create);

  return (
    <>
      <Breadcrumbs breadcrumbsProps={{ sx: { mb: 2 } }} links={links} />
      <FilterModule />
      <Stack
        display="flex"
        direction="row"
        justifyContent="flex-end"
        gap={2}
        mb={2}
      >
        <Button variant="contained" endIcon={<AddIcon />} onClick={addRegister}>
          Agregar
        </Button>
      </Stack>
      <ListTableModule dataTable={dataTable} />
      {isLoadingList && <Loading />}
    </>
  );
};

export default UserListPage;
