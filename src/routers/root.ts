import { Context, DefaultContext, Next } from "koa";
import Router from "@koa/router";

const root = new Router();
root.get("/", async (ctx: Context, next: any) => {
  ctx.body = { message: "ok" };
  //   await next();
});

export default root;
