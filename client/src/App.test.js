import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import {
  selectCountry,
  enterCity,
  submitForm,
  waitForProgressBar,
} from "./utils/tests/userActions";
import fakeLocalStorage from "./utils/tests/fakeLocalStorage";

afterEach(cleanup);

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: fakeLocalStorage,
  });
});

beforeEach(() => {
  fakeLocalStorage.clear();
});

test("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);
});

test("should show the current weather if user data is valid", async () => {
  render(<App />);
  selectCountry();
  enterCity("Buenos Aires");
  await submitForm();
  await waitForProgressBar();

  const currentStatus = screen.queryByTestId("current-weather");
  expect(currentStatus).toBeInTheDocument();
});

test("should show error if inputs are invalid", async () => {
  render(<App />);
  selectCountry();
  enterCity("INVALID");
  await submitForm();
  await waitForProgressBar();

  const errorElm = screen.queryByRole("alert");
  expect(errorElm).toBeInTheDocument();
});

test("should save user data in localstorage", async () => {
  render(<App />);
  selectCountry();
  enterCity("Buenos Aires");
  await submitForm();
  await waitForProgressBar();

  const user = JSON.parse(fakeLocalStorage.getItem("user"));
  expect(user.city).toBe("Buenos Aires");
  expect(user.country).toBe("AR");
});
