import mongoose from "mongoose";
import userModel from "../models/user.js";
import 'dotenv/config';

mongoose.set("debug", true);
const atlasConnectionString = process.env.MONGODB_URI;

mongoose
  .connect(atlasConnectionString, {
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUser(id)
{
  return userModel.findByIdAndDelete(id);
} 

function getAllUsers() {
  return userModel.find();
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUser,
  getAllUsers
};