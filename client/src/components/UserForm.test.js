import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import UserForm from "./UserForm";
import {
  selectCountry,
  enterCity,
  submitForm,
} from "./utils/tests/userActions";

const promise = Promise.resolve();
const mockSubmit = jest.fn(() => {
  return promise;
});

afterEach(cleanup);

it("should not submit form if inputs aren't present", async () => {
  render(<UserForm onSubmit={mockSubmit} />);
  fireEvent.submit(screen.getByText(/save/i));
  expect(mockSubmit).not.toBeCalled();
});

it("should submit the form if inputs are valid", async () => {
  render(<UserForm onSubmit={mockSubmit} />);
  selectCountry();
  enterCity("Buenos Aires");
  submitForm();

  expect(mockSubmit).toBeCalled();
});
