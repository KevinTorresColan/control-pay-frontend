import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Alert, Snackbar, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../../hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAlert } from "@/hooks";
import { pipe } from "@/util";
import { IApiResponse } from "@/interface";
import { IUserLogin } from "../../interfaces";
import "./styles.scss";
import { homeRoutes } from "@/routes";

const prefix = "m-form-module";

const FormModule = () => {
  const { alertType, handleClose, generateAlert, messageAlert, openSnackbar } =
    useAlert();
  const { isLoading, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [dataFields, setDataFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setDataFields((preValue) => ({ ...preValue, [name]: value }));
  };

  const handleAlert = (data: IApiResponse<IUserLogin>) => {
    generateAlert({ ...data });
    return data;
  };

  const getNavigate = (data: IApiResponse<IUserLogin>) => {
    navigate(homeRoutes.home);
    return data;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(dataFields).then(pipe(handleAlert, getNavigate));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <form className={prefix} onSubmit={submit}>
        <h2 className={`${prefix}__title`}>Iniciar sesiòn</h2>
        <Grid container rowSpacing={2} className={`${prefix}__box`}>
          <Grid size={12}>
            <TextField
              label="Correo"
              onChange={handleChange}
              value={dataFields.email}
              name="email"
              type="email"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Contraseña"
              onChange={handleChange}
              value={dataFields.password}
              name="password"
              type={showPassword ? "text" : "password"}
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <LoadingButton
          loading={isLoading}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<LoginIcon />}
          fullWidth
        >
          Ingresar
        </LoadingButton>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={alertType} variant="filled" sx={{ width: "100%" }}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormModule;
