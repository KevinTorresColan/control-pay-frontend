import { FormEvent } from "react";
import { Button, Input, InputWithInfo } from "@/components";
import "./styles.scss";

const prefix = "m-form-module";

const FormModule = () => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={prefix} onSubmit={submit}>
      <h2 className={`${prefix}__title`}>Iniciar sesiòn</h2>
      <InputWithInfo className={`${prefix}__box`} label="Correo electrónico">
        <Input name="email" type="email" placeholder="@ejemplo.com" />
      </InputWithInfo>
      <InputWithInfo className={`${prefix}__box`} label="Contraseña">
        <Input name="email" type="password" />
      </InputWithInfo>
      <Button type="submit" fullwidth>
        Ingresar
      </Button>
    </form>
  );
};

export default FormModule;
