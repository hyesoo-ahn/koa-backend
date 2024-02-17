import { Context, DefaultContext, Next } from "koa";
import Router from "@koa/router";

const router = new Router();

router.get("/", async (ctx: Context, next: any) => {
  ctx.body = { message: "ok" };
  //   await next();
});

export default router;
