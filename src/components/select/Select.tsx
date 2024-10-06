import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ISelect } from "@/interface";
import { forwardRef } from "react";

const SelectComponent = forwardRef(
  (
    {
      data,
      disabled,
      formControlProps,
      handleChange,
      label,
      name,
      selectProps,
      value,
      error,
      helperText,
    }: ISelect,
    ref,
  ) => {
    return (
      <FormControl
        disabled={disabled}
        error={error}
        fullWidth
        size="small"
        {...formControlProps}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          disabled={disabled}
          error={error}
          name={name}
          value={value}
          label={label}
          size="small"
          onChange={handleChange}
          ref={ref}
          {...selectProps}
        >
          {data.map(({ id, text }) => (
            <MenuItem key={id} value={id}>
              {text}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default SelectComponent;
