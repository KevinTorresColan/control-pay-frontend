/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputProps, TextField } from "@mui/material";
import { ISchema } from "@/interface";

interface FormControllerProps {
  label: string;
  defaultValue?: string;
  schema: ISchema;
  shouldUnregister?: boolean;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  InputProps?: InputProps;
  type?: HTMLInputTypeAttribute;
}

const FormController = ({
  InputProps,
  label = "",
  defaultValue = "",
  schema,
  shouldUnregister = false,
  handleChange,
  disabled,
  type = "text",
}: FormControllerProps) => {
  const [error, setError] = useState(false);
  const formContext = useFormContext();
  const { control, formState, trigger } = formContext;
  const { errors } = formState;

  const bugTracking = async () => {
    const result = await trigger(schema.name, { shouldFocus: true });
    setError(!result);
  };

  return (
    <Controller
      control={control}
      name={schema.name}
      defaultValue={defaultValue}
      rules={schema.validations}
      shouldUnregister={shouldUnregister}
      render={({ field }) => {
        const { ref, value, name: fieldName, onChange, onBlur } = field;

        return (
          <TextField
            ref={ref}
            id={fieldName}
            label={label}
            value={value}
            onChange={(e: any) => {
              onChange(e);
              bugTracking();
              if (handleChange) handleChange(e);
            }}
            onBlur={onBlur}
            type={schema.type || type}
            size="small"
            error={error || !!errors[schema.name]}
            helperText={errors[schema.name]?.message as ReactNode}
            disabled={disabled}
            InputProps={InputProps}
            fullWidth
          />
        );
      }}
    />
  );
};

export default FormController;
