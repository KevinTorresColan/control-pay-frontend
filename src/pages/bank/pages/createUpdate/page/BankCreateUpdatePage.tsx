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
import { homeRoutes, bankRoutes } from "@/routes";
import { IApiResponse, IFormWrapperRef, Ilink } from "@/interface";
import { useAlert } from "@/hooks";
import { pipe, updateFormValues } from "@/util";
import { useBank } from "@/pages/bank/hooks";
import { IBankCreateUpdate } from "@/pages/bank/interfaces";
import { schemaCreateUpdate } from "@/pages/bank/schemas";

const BankCreateUpdatePage = () => {
  const { createBank, isLoadingCreate, isLoadingUpdate, updateBank, bankById } =
    useBank();
  const { alertType, handleClose, generateAlert, messageAlert, openSnackbar } =
    useAlert();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<IFormWrapperRef<IBankCreateUpdate>>(null);
  const form = useForm();
  const { setValue } = form;
  const schema = schemaCreateUpdate();

  const links: Ilink[] = [
    { name: "Menu", href: homeRoutes.home },
    { name: "Listar bancos", href: bankRoutes.get },
    { name: id ? "Actualizar banco " : "Crear banco" },
  ];

  const handleAlert = (data: IApiResponse<IBankCreateUpdate>) => {
    generateAlert({ ...data });
    return data;
  };

  const onSubmitSuccess = async (dataSend: IBankCreateUpdate) => {
    if (id) await updateBank(id, dataSend).then(pipe(handleAlert));
    else await createBank(dataSend).then(pipe(handleAlert));
    setOpen(false);
  };

  const confirmSave = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleSubmit = () =>
    ref.current!.submit(onSubmitSuccess, handleCloseModal);

  const getDataById = async (id: string) => {
    const { data } = await bankById(id);
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
              <FormController schema={schema.name} label="Nombre" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.account} label="N° de cuenta" />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <FormController schema={schema.cci} label="CCI" />
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
          onClick={() => navigate(bankRoutes.get)}
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

export default BankCreateUpdatePage;
