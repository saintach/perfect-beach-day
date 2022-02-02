import React, { useEffect, useState } from "react";
import './App.css';
import config from "./config.js";
import axios from "axios";

function App() {

  const [today, setToday] = useState({});

  const fetchTodayWeather = async () => {
    const params = {
      city: "London",
      country: "GB",
      units: "metric"
    }
    try {
      const response = await axios.get(`${config.api.url}/today`, {params});
      setToday(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTodayWeather();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {`Now it feels like ${today.current.feels_like}ºC in London`}
      </header>
    </div>
  );
}

export default App;
