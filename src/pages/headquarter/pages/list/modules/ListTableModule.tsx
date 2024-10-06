import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ListRegister } from "@/components";
import { HeadquarterListContext } from "../context";
import { headquarterRoutes } from "@/routes";
import { IHeadquarter } from "@/pages/headquarter/interfaces";

const headTable = [
  { name: "NOMBRE" },
  { name: "DIRECCIÓN" },
  { name: "ESTADO" },
  { name: "ACCIONES" },
];

const ListTableModule = ({ dataTable }: { dataTable: IHeadquarter[] }) => {
  const {
    count,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  } = useContext(HeadquarterListContext);
  const navigate = useNavigate();
  const editRegister = (id: number) =>
    navigate(`${headquarterRoutes.get}/${id}`);

  return (
    <>
      <ListRegister
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        dataRegister={dataTable}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        headTable={headTable}
      >
        {dataTable?.length > 0 ? (
          dataTable.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row?.name}</TableCell>
              <TableCell align="center">{row?.address}</TableCell>
              <TableCell align="center">{row?.state}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton onClick={() => editRegister(row.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              sx={{ padding: 1 }}
              colSpan={headTable?.length + 1}
              align="center"
            >
              No hay registros
            </TableCell>
          </TableRow>
        )}
      </ListRegister>
    </>
  );
};

export default ListTableModule;
