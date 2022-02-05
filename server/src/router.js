import { routes as addWeatherRoutes } from "./routes/WeatherRoutes.js";
import Router from "@koa/router";

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Perfect Beach Day API";
  return next();
});

router.get("/ping", (ctx, next) => {
  ctx.body = "Pong";
  return next();
});

addWeatherRoutes(router);

export default router;
