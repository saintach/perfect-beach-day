import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputRadio = ({
  name,
  control,
  label,
  options,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error }
        }) => (
          <RadioGroup value={value} onChange={onChange} style={{alignItems: 'center'}}>
            {
              options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  control={<Radio />}
                />
              ))
            }
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};