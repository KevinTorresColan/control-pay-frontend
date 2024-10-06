import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Breadcrumbs, Loading } from "@/components";
import { documentTypeRoutes, homeRoutes } from "@/routes";
import { FilterModule, ListTableModule } from "../modules";
import { DocumentTypeListContext } from "../context";

const links = [
  { name: "Menu", href: homeRoutes.home },
  { name: "Listar tipo de documento" },
];

export const DocumentListPage = () => {
  const { dataTable, isLoadingList } = useContext(DocumentTypeListContext);
  const navigate = useNavigate();

  const addRegister = () => navigate(documentTypeRoutes.create);

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
