import { routes as addWeatherRoutes } from "./routes/WeatherRoutes.js";
import Router from "@koa/router";

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Is today a perfect beach day?";
  return next();
});

addWeatherRoutes(router);

export default router;

