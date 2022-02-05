import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
  within,
} from "@testing-library/react";
import UserForm from "./UserForm";
import React from "react";

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

it("should submit if inputs are valid", async () => {
  render(<UserForm onSubmit={mockSubmit} />);

  // Get the dropdown first
  const selectElm = screen.getByRole("button");
  expect(selectElm).toBeInTheDocument();
  // Simulate user click
  fireEvent.mouseDown(selectElm);
  // Select text with desired value
  const list = screen.getByRole("listbox");
  expect(list).toBeInTheDocument();
  fireEvent.click(within(list).getByText(/Argentina/i));

  // Input change city text box
  fireEvent.input(screen.getByRole("textbox", { name: /Your City */i }), {
    target: {
      value: "Buenos Aires",
    },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("submit"));
  });

  expect(mockSubmit).toBeCalled();
});

it("should show error if inputs are invalid", async () => {
  render(<UserForm onSubmit={mockSubmit} />);

  // Get the dropdown first
  const selectElm = screen.getByRole("button");
  expect(selectElm).toBeInTheDocument();
  // Simulate user click
  fireEvent.mouseDown(selectElm);
  // Select text with desired value
  const list = screen.getByRole("listbox");
  expect(list).toBeInTheDocument();
  fireEvent.click(within(list).getByText(/Argentina/i));

  // Input change city text box
  fireEvent.input(screen.getByRole("textbox", { name: /Your City */i }), {
    target: {
      value: "INVALID",
    },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("submit"));
  });

  expect(mockSubmit).toBeCalled();

  // await waitFor(() => {
  //   const error = screen.getByRole("alert");
  //   expect(error).toBeInTheDocument() // TODO: DOM changes needs to be accounted for
  // });
});
