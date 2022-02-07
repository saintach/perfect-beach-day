import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import UserForm from "./UserForm";

const promise = Promise.resolve();
const mockSubmit = jest.fn(() => {
  return promise;
});

afterEach(cleanup);

test("should not submit form if inputs aren't present", async () => {
  render(<UserForm onSubmit={mockSubmit} />);
  fireEvent.submit(screen.getByText(/save/i));
  expect(mockSubmit).not.toBeCalled();
});

test.todo("should change temperature and wind slider values")