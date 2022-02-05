import React, { useEffect } from "react";
import { FormControl, FormLabel, Slider } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputSlider = ({
  name,
  control,
  setValue,
  label,
  defaultValue,
  min,
  max,
}) => {
  const [sliderValue, setSliderValue] = React.useState(defaultValue);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <FormControl>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Slider
            value={sliderValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={min}
            max={max}
            step={1}
          />
        )}
      />
    </FormControl>
  );
};
