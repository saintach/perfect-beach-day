import React from "react";
import { render, cleanup } from "@testing-library/react";
import WeatherStatus, { Suggestion } from "./WeatherStatus";
import { valid_response } from "../utils/tests/mock_response";
import { DEFAULT_USER } from "../constants/user";

afterEach(cleanup);

test("should render with valid props", async () => {
  render(
    <WeatherStatus
      hourly={valid_response.hourly}
      selectedIndex={0}
      user={DEFAULT_USER}
    />
  );
});

test("should render error invalid props", async () => {
  render(<WeatherStatus hourly={null} selectedIndex={0} user={null} />);
});

test("show expected suggestions", async () => {
  const { rerender } = render(
    <Suggestion user={DEFAULT_USER} selectedHour={valid_response.hourly[0]} />
  );
  rerender(
    <Suggestion user={DEFAULT_USER} selectedHour={valid_response.hourly[1]} />
  );
  rerender(
    <Suggestion user={DEFAULT_USER} selectedHour={valid_response.hourly[2]} />
  );
  rerender(
    <Suggestion user={DEFAULT_USER} selectedHour={valid_response.hourly[3]} />
  );
});
