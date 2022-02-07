export const DEFAULT_USER = {
  city: "",
  country: "",
  unit: "metric",
  temperature: [18, 30],
  wind: [2, 25],
};

export const DEFAULT_USER_IMPERIAL = {
  ...DEFAULT_USER,
  temperature: [68, 86],
  wind: [1, 15],
};
