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
import { homeRoutes, documentTypeRoutes } from "@/routes";
import { IApiResponse, IFormWrapperRef, Ilink } from "@/interface";
import { useAlert } from "@/hooks";
import { pipe, updateFormValues } from "@/util";
import { useDocumentType } from "../../hooks";
import { IDocumentTypeFilter } from "../../interface";
import { schemaCreateUpdate } from "../../schemas/createUpdate";

export const DocumentTypeCreateUpdatePage = () => {
  const {
    createDocumentType,
    isLoadingCreate,
    isLoadingUpdate,
    updateDocumentType,
    documentTypeById,
  } = useDocumentType();
  const { alertType, handleClose, generateAlert, messageAlert, openSnackbar } =
    useAlert();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<IFormWrapperRef<IDocumentTypeFilter>>(null);
  const form = useForm();
  const { setValue } = form;
  const schema = schemaCreateUpdate();

  const links: Ilink[] = [
    { name: "Menu", href: homeRoutes.home },
    { name: "Listar tipo de documento", href: documentTypeRoutes.get },
    { name: id ? "Actualizar tipo de documento" : "Crear tipo de documento" },
  ];

  const handleAlert = (data: IApiResponse<IDocumentTypeFilter>) => {
    generateAlert({ ...data });
    return data;
  };

  const onSubmitSuccess = async (dataSend: IDocumentTypeFilter) => {
    if (id) await updateDocumentType(id, dataSend).then(pipe(handleAlert));
    else await createDocumentType(dataSend).then(pipe(handleAlert));
    setOpen(false);
  };

  const confirmSave = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleSubmit = () =>
    ref.current!.submit(onSubmitSuccess, handleCloseModal);

  const getDataById = async (id: string) => {
    const { data } = await documentTypeById(id);
    updateFormValues(data, setValue);
  };

  useEffect(() => {
    if (id) getDataById(id!);
    else setValue("state", "1");
  }, []);

  return (
    <>
      <Breadcrumbs breadcrumbsProps={{ sx: { mb: 2 } }} links={links} />
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormWrapper methods={form} ref={ref}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.name} label="Tipo de documento" />
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
          onClick={() => navigate(documentTypeRoutes.get)}
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
      {isLoadingUpdate && <Loading />}
    </>
  );
};
