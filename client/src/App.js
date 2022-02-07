import React, { useEffect, useState } from "react";
import { CircularProgress, Link, Paper, Typography } from "@mui/material";
import axios from "axios";
import "./App.css";
import TimeSelection from "./components/TimeSelection";
import CurrentWeatherStatus from "./components/WeatherStatus";
import UserForm from "./components/UserForm.js";
import { useLocalStorage } from "./hooks/useLocalStorage";

const DEFAULT_USER = {
  city: '',
  country: '',
  unit: "metric",
  temperature: [18, 30],
  wind: [0, 15]
}

const App = () => {
  // User data
  const [user, setUser] = useLocalStorage(
    "user",
    JSON.parse(localStorage.getItem("user")) || DEFAULT_USER
  );
  // Current selected hour
  const [selectedIndex, setSelectedIndex] = useState(0);
  // API data
  const [today, setToday] = useState({});
  const [error, setError] = useState();
  // UI states
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const { city, country, unit } = user;
    async function fetchTodayWeather() {
      setLoading(true);
      const params = {
        city,
        country,
        units: unit,
      };
      try {
        const response = await axios.get(`http://localhost:3001/today`, { params }); // TODO: replace url and port with env var
        setToday(response.data);
        setError();
      } catch (e) {
        setError("Error fetching today's weather. Please enter the correct city.");
        setShowForm(true);
      }
      setLoading(false);
    }
    //ONLY fetch data if it's ready
    if (city && country) fetchTodayWeather();
  }, [user]);

  function submitForm(data) {
    setUser(data);
    setShowForm(false);
  }

  return (
    <div className="App">
      <Paper className="Main">
        <Typography variant="h3" component="h1">
          Is today a perfect beach day?
        </Typography>
        {!user.city || !user.country || showForm ? (
          <UserForm onSubmit={submitForm} user={user} error={error} loading={loading}/>
        ) : loading ? (
          <CircularProgress />
        ) : (
          <>
            <TimeSelection
              hourly={today.hourly}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              timeZone={today.timezone}
            />
            <CurrentWeatherStatus
              hourly={today.hourly}
              selectedIndex={selectedIndex}
              user={user}
            />
            <br />
            <Link onClick={() => setShowForm(!showForm)}>
              Customize your preferences
            </Link>
          </>
        )}
      </Paper>
    </div>
  );
};

export default App;
