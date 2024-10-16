import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Alert,
  Breadcrumbs,
  ConfirmationModal,
  FormController,
  FormWrapper,
  Loading,
  SelectController,
} from "@/components";
import { state } from "@/data";
import { homeRoutes, studentsRoutes } from "@/routes";
import { IApiResponse, ICombo, IFormWrapperRef, Ilink } from "@/interface";
import { useAlert } from "@/hooks";
import { pipe, updateFormValues } from "@/util";
import { useUser } from "@/pages/user/hooks";
import { IUserCreateUpdate } from "@/pages/user/interfaces";
import { schemaCreateUpdate } from "@/pages/user/schemas";

const StudentCreateUpdatePage = () => {
  const {
    createUser,
    isLoadingCreate,
    updateUser,
    userById,
    comboDocumentType,
    comboRol,
  } = useUser();
  const { alertType, handleClose, generateAlert, messageAlert, openSnackbar } =
    useAlert();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [documentsType, setDocumentsType] = useState<ICombo[]>([]);
  const [roles, setRoles] = useState<ICombo[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const navigate = useNavigate();
  const ref = useRef<IFormWrapperRef<IUserCreateUpdate>>(null);
  const form = useForm();
  const { setValue } = form;
  const schema = schemaCreateUpdate();

  const links: Ilink[] = [
    { name: "Menu", href: homeRoutes.home },
    { name: "Listar alumnos", href: studentsRoutes.get },
    { name: id ? "Actualizar alumno" : "Crear alumno" },
  ];

  const handleAlert = (data: IApiResponse<IUserCreateUpdate>) => {
    generateAlert({ ...data });
    return data;
  };

  const onSubmitSuccess = async (dataSend: IUserCreateUpdate) => {
    if (id) await updateUser(id, dataSend).then(pipe(handleAlert));
    else await createUser(dataSend).then(pipe(handleAlert));
    setOpen(false);
  };

  const confirmSave = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleSubmit = () =>
    ref.current!.submit(onSubmitSuccess, handleCloseModal);

  const getDataById = async (id: string) => {
    const { data } = await userById(id);
    updateFormValues(data, setValue);
  };

  const getCombos = async () => {
    const documentsType = await comboDocumentType();
    const roles = await comboRol();
    setDocumentsType(documentsType?.data);
    setRoles(roles?.data);
  };

  useEffect(() => {
    (async () => {
      if (id) await getDataById(id);
      else setValue("state", "1");

      await getCombos();

      setIsLoadingPage(false);
    })();
  }, []);

  return (
    <>
      <Breadcrumbs breadcrumbsProps={{ sx: { mb: 2 } }} links={links} />
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormWrapper methods={form} ref={ref}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.names} label="Nombres" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.lastName} label="Apellidos" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <SelectController
                data={roles}
                schema={schema.idRole}
                label="Rol"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <SelectController
                data={documentsType}
                schema={schema.idDocumentsType}
                label="Tipo de documento"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController
                schema={schema.documentNumber}
                label="N° de documento"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.email} label="Correo" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.age} label="Edad" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.birthday} label="Cumpleaños" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.cellPhone} label="Celular" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.address} label="Dirección" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <SelectController
                data={state}
                schema={schema.state}
                label="Estado"
                disabled={!id}
              />
            </Grid>
          </Grid>
        </FormWrapper>
      </Paper>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={2}
        justifyContent="flex-end"
        mt={2}
      >
        <Button
          onClick={confirmSave}
          variant="contained"
          sx={{ order: { xs: 1, sm: 2 } }}
        >
          {id ? "Actualizar" : "Crear"}
        </Button>
        <Button
          variant="outlined"
          sx={{ order: { xs: 2, sm: 1 } }}
          onClick={() => navigate(studentsRoutes.get)}
          startIcon={<ArrowBackIosIcon fontSize="small" />}
        >
          Regresar
        </Button>
      </Stack>
      <ConfirmationModal
        open={open}
        handleClose={handleCloseModal}
        actionButtonConfirm={handleSubmit}
        isLoading={isLoadingCreate}
      />
      <Alert open={openSnackbar} onClose={handleClose} type={alertType}>
        {messageAlert}
      </Alert>
      {isLoadingPage && <Loading />}
    </>
  );
};

export default StudentCreateUpdatePage;
