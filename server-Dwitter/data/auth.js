import { getUsers } from "../database/database.js";
import MongoDb from "mongodb";

const ObjectId = MongoDb.ObjectId;

export async function findByUsername(username) {
  return getUsers() //
    .findOne({ username }) //
    .then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) }) // MongoDB Atlas에서서는  id가 _id로 입력되며 ObjectId('~~') 형태로 저장되기 때문
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
