import Koa, { Context, DefaultContext, Next } from "koa";
import bodyParser from "koa-bodyparser";
import { main } from "./database/mongoDB";
import router from "./router";
import cors from "@koa/cors";

const app = new Koa();

app.use(async (ctx: DefaultContext, next: any) => {
  try {
    await next();
    console.log("Next on appuse: ");
    console.log(new Date().toString());
  } catch (err) {
    console.log(err.message);

    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
});

app
  .use(cors())
  .use(bodyParser()) // Request Body 연결
  .use(router.routes()) // 라우터 연결
  .use(router.allowedMethods());

// http listen port 생성 서버 실행
app.listen(4000, () => {
  main();
  console.log(`koa server is runnig on 4000.`);
});
