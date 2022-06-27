import { DefaultContext } from "koa";

export const toToken = (ctx: DefaultContext): string => {
  return ctx.request.headers.authorization.split(" ")[1];
};
