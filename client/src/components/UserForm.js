import { Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./FormInputs/FormInputText";
import { FormInputDropdown } from "./FormInputs/FormInputDropdown";
import { FormInputSlider } from "./FormInputs/FormInputSlider";
import { FormInputRadio } from "./FormInputs/FormInputRadio";
import { COUNTRIES } from "../constants/countries";
import { DEFAULT_USER, DEFAULT_USER_IMPERIAL } from "../constants/user";

const radioOptions = [
  {
    label: "ºC",
    value: "metric",
  },
  {
    label: "ºF",
    value: "imperial",
  },
];

export default function UserForm(props) {
  const { user, error } = props;
  // react-hook-form configurations
  const defaultValues = {
    city: user ? user.city : DEFAULT_USER.city,
    country: user ? user.country : DEFAULT_USER.country,
    unit: user ? user.unit : DEFAULT_USER.unit,
    temperature: user ? user.temperature : DEFAULT_USER.temperature,
    wind: user ? user.wind : DEFAULT_USER.wind,
  };
  const methods = useForm({ defaultValues });
  const { handleSubmit, control, setValue, watch } = methods;
  // Change sliders according to user selected unit
  const watchUnit = watch("unit", defaultValues.unit);
  // Handle submit
  const onSubmit = (data) => props.onSubmit(data);

  return (
    <Paper
      elevation={0}
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px"
      }}
    >
      <Typography variant="h6">Settings</Typography>

      {error ? (
        <Typography style={{ color: "red" }} variant="h6" role="alert">
          {error}
        </Typography>
      ) : (
        ""
      )}

      <FormInputDropdown
        name="country"
        control={control}
        label="Your Country *"
        rules={{ required: true }}
        options={COUNTRIES}
        mapping={{ label: "name", value: "code" }}
      />

      <FormInputText
        name="city"
        control={control}
        label="Your City *"
        rules={{ required: { value: true, message: "City is required."} }}
      />

      <FormInputRadio
        name={"unit"}
        control={control}
        label={"Unit"}
        options={radioOptions}
      />

      <FormInputSlider
        name={"temperature"}
        control={control}
        setValue={setValue}
        label={`Preferred Temperature (º${
          watchUnit === "imperial" ? "F" : "C"
        })`}
        defaultValue={defaultValues.temperature}
        min={0}
        max={watchUnit === "imperial" ? 150 : 100}
      />

      <FormInputSlider
        name={"wind"}
        control={control}
        setValue={setValue}
        label={`Preferred Wind Speed (${
          watchUnit === "imperial" ? "m/h" : "m/s"
        })`}
        defaultValue={defaultValues.wind}
        min={0}
        max={watchUnit === "imperial" ? 50 : 100}
      />

      <Button role="submit" onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Save
      </Button>
    </Paper>
  );
}
