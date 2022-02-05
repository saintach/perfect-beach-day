import { WeatherRouteHandler } from "./WeatherRouteHandler.js";

const handler = new WeatherRouteHandler();

export const routes = (router) => {
  router.get("/today", handler.getTodayWeather);
};
