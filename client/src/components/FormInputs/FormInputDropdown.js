import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputDropdown = ({ name, control, label, options, mapping, rules }) => {
  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ 
          field: { onChange, value },
          fieldState: { error }
        }) => (
          <Select onChange={onChange} value={value} error={!!error} name={name}>
            {options.map((option) => (
              <MenuItem key={option[mapping['value']]} value={option[mapping['value']]}>
                {option[mapping['label']]}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
