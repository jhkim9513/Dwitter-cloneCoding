import MongoDb from "mongodb";
import { config } from "../config.js";

/* 
  NOSQL (정보의 중복 > 관계) : NOSQL의 경우관계를 가지는거보다 중복정보를 가지는게 성능에 더 우수함
  각각의 DB가 독립적
  확장에 용이하다. ex) 사용자 문서 DB : 서버1, 서버2, 서버3 ~~
  관계형 조인쿼리 성능이 좋지 않다.
*/

/* 
  SQL : 관계형
  조인쿼리 성능이 좋다.
*/

let db;

export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => {
      db = client.db();
    });
}

export function getUsers() {
  return db.collection("users");
}
export function getTweets() {
  return db.collection("tweets");
}
