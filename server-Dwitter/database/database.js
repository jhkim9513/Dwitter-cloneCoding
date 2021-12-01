import Mongoose from "mongoose";
import { config } from "../config.js";

/* Mongoose 버전6 미만일 경우 옵션 설정하고 
export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
} 
*/

// Mongoose 버전6 이상일 때는 옵션 설정을 하지 않아도 된다.
export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

// _id -> id
export function useVirtualId(schema) {
  // DB에는 _id로 저장되지만 서버상에서 읽을 때 id가 추가됨
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  // 그리고 virtual값이 JSON과 Object에 포함될 수 있도록 설정
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}

// TODO(kim) : Delete blow
let db;
export function getTweets() {
  return db.collection("tweets");
}
