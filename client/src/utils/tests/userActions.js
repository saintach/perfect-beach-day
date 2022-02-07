import {
  screen,
  fireEvent,
  within,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";

export const selectCountry = () => {
  // Get the dropdown first
  const selectElm = screen.getByRole("button");
  expect(selectElm).toBeInTheDocument();
  // Simulate user click
  fireEvent.mouseDown(selectElm);
  // Select text with desired value
  const list = screen.getByRole("listbox");
  expect(list).toBeInTheDocument();
  fireEvent.click(within(list).getByText(/Argentina/i));
};

export const enterCity = (city) => {
  // Input change city text box
  fireEvent.input(screen.getByRole("textbox", { name: /Your City */i }), {
    target: {
      value: city,
    },
  });
};

export const submitForm = async () => {
  await act(async () => {
    fireEvent.click(screen.getByRole("submit"));
  });
};

export const waitForProgressBar = async () =>
  await waitForElementToBeRemoved(screen.queryByRole("progressbar"), {
    timeout: 10000,
  });
