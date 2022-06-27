import Application, { Context, DefaultContext, Next } from "koa";
import Router from "@koa/router";
import root from "./routers/root";
import auth from "./routers/auth";

const router = new Router();

router.use("/", root.routes());
router.use("/auth", auth.routes());

export default router;
