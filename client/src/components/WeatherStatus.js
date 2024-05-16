import { Chip, Stack, Typography } from "@mui/material";
import SunIcon from "@mui/icons-material/WbSunny";
import WindIcon from "@mui/icons-material/Air";
import LocationIcon from "@mui/icons-material/LocationOn";
import RainIcon from "@mui/icons-material/Umbrella";

export const Suggestion = ({ user, selectedHour }) => {
  const { temperature, wind } = user;
  const { weather, rain } = selectedHour;
  const { temp } = selectedHour?.main;
  const wind_speed = selectedHour?.wind?.speed;
  
  const min_temp = temperature[0],
    max_temp = temperature[1];
  const min_wind = wind[0],
    max_wind = wind[1];
  let main_text = "";
  let temp_reading = "";
  let wind_reading = "";
  let score = 0;
  
  // First check rain
  if (rain) return <Typography variant="h4">Nope! It's raining :(</Typography>;

  // Check temperature
  if (temp >= min_temp && temp <= max_temp) {
    temp_reading = "perfect temperature";
    score += 2;
  } else if (temp < min_temp) {
    temp_reading = "too cold";
    score += 1;
  } else if (temp > max_temp) {
    temp_reading = "too hot";
    score += 1;
  }

  // Check wind
  if (wind_speed >= min_wind && wind_speed <= max_wind) {
    wind_reading = "perfect wind";
    score += 2;
  } else if (wind_speed < min_wind) {
    wind_reading = "less wind";
    score += 1;
  } else if (wind_speed > max_wind) {
    wind_reading = "windier than you like";
    score += 1;
  }

  switch (score) {
    case 4:
      main_text = "Yes! It's perfect!";
      break;
    case 3:
      main_text = "Yes! It's good.";
      break;
    case 2:
      main_text = "Maybe, it's an okay day.";
      break;
    default:
  }
  
  return (
    <>
      <Typography variant="h4">{main_text}</Typography>
      <Typography variant="p">
        With {weather[0].description}, {temp_reading} and {wind_reading}.
      </Typography>
    </>
  );
};

export default function CurrentWeatherStatus({ user, hourly, selectedIndex }) {
  if (!user || !hourly || !hourly[selectedIndex]) {
    return (<Typography>Oops! Something went wrong.</Typography>)
  }
  const selectedHour = hourly[selectedIndex];
  const { weather, rain, wind } = selectedHour;
  const { temp, feels_like, uvi } = selectedHour?.main;
  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="center" data-testid="current-weather">
        <img
          alt={weather[0].description}
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
        />
        <Stack direction="column" justifyContent="center">
          <Stack direction="row">
            <LocationIcon />
            <Typography>
              {user.city},{user.country}
            </Typography>
          </Stack>
          <Typography variant="h4">{`${Math.round(temp)}º${
            user.unit === "imperial" ? "F" : "C"
          }`}</Typography>
          <Typography variant="p">Feels {Math.round(feels_like)}º</Typography>
        </Stack>
      </Stack>
      <Suggestion user={user} selectedHour={selectedHour} />
      <br /> <br />
      <Stack direction="row" spacing={1} justifyContent="center">
        <Chip
          color="primary"
          icon={<RainIcon />}
          label={
            rain && rain["1h"]
              ? `${rain["1h"]}mm rain the last hour`
              : rain && rain["3h"]
              ? `${rain["3h"]}mm rain the last 3 hours`
              : "No rain"
          }
          variant="filled"
        />
        <Chip
          color="warning"
          icon={<WindIcon />}
          label={`Wind ${wind?.speed}m/s`}
          variant="filled"
        />
        <Chip
          color="secondary"
          icon={<SunIcon />}
          label={`UV Index of ${uvi}`}
          variant="filled"
        />
      </Stack>
    </>
  );
}
