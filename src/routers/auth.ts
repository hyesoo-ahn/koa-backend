import Router from "@koa/router";
import { Context, DefaultContext } from "koa";
import { client, findOne, insertOne, updateOne } from "../database/mongoDB";
import { ObjectId } from "mongodb";
import { createJwtToken, decodeJwtToken, hash, salt } from "../lib/auth";
import { toToken } from "../lib/utils";

const collection = client.db().collection("users");
const router = new Router();

router.post("/signup", async (ctx: Context, next: any) => {
  const salted: string = salt();
  const { id, name, age } = ctx.request.body;
  const password: string = hash(`${ctx.request.body.password}${salted}`);

  const result = await insertOne("users", {
    id: id,
    name,
    age,
    // hash, salted로 비밀번호 저장
    hash: password,
    salt: salted,
  });

  // insertedId로 토큰 생성
  if (result.insertedId !== "") {
    const token: string = createJwtToken(result.insertedId);
    return (ctx.body = token);
  } else {
    return (ctx.body = false);
  }
});

router.get("/signin", async (ctx: DefaultContext, next: any) => {
  const result = await findOne("users", { id: ctx.request.query.id });
  if (!result) {
    return ctx.throw(400, "존재하지 않는 아이디");
  }
  const verifyHash: string = hash(`${ctx.request.query.password}${result.salt}`);
  if (verifyHash === result.hash) {
    // 토큰 리턴
    return (ctx.body = createJwtToken(result._id.toString()));
  } else {
    return ctx.throw(400, "아이디, 패스워드 불일치");
  }
});

// 토큰 검증 후 유저정보 가져오기
router.get("/userinfo", async (ctx: DefaultContext, next: any) => {
  //   try {
  let bearerToken: string = ctx.request.headers.authorization.split(" ")[1];
  const decodeResult: any = decodeJwtToken(bearerToken);

  if (decodeResult._id) {
    const _id = new ObjectId(decodeResult._id);
    const userInfo: any = await findOne("users", { _id: _id });
    if (userInfo) ctx.body = userInfo;
    else ctx.throw(400, "존재하지 않는 유저");
  } else {
    ctx.throw(400, decodeResult.message);
  }
});

// 유저 정보 변경
router.put("/updateuser", async (ctx: DefaultContext, next: any) => {
  let bearerToken: string = toToken(ctx);
  const decodeResult: any = decodeJwtToken(bearerToken);

  if (decodeResult._id) {
    const _id = new ObjectId(decodeResult._id);
    const updateuserInfoResult: any = await updateOne("users", _id, {
      ...ctx.request.body,
    });
    if (updateuserInfoResult) ctx.body = updateuserInfoResult;
  } else {
    ctx.throw(400, "토큰이 유효하지 않습니다.");
  }
});

// 유저 삭제

export default router;
