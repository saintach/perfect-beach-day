import koa from "koa";
import router from "./router.js";
import respond from "koa-respond";
import cors from "koa-cors";

const app = new koa();

// Allow cors access
app.use(cors({ origin: "*", methods: ["OPTIONS", "GET", "POST"] }));

// Custom koa respond middleware
app.use(respond());

// Apply routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
  console.log(`Server is running on port 3001.`);
});
