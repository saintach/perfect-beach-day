
import React from "react";
import { Controller } from "react-hook-form";
import {
    TextField,
  } from "@mui/material";

export const FormInputText = ({ name, control, label, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <TextField
          role="textbox"
          name={name}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};