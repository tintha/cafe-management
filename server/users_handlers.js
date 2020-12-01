"use strict";
const { MongoClient } = require("mongodb");
const assert = require("assert");
const bcrypt = require("bcrypt");
const saltRounds = 10;

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const APP_DB = "cb-final";
const USERS_COLLECTION = "users";

const getUsers = async (req, res) => {
  console.log(req.session);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const users = await db.collection(USERS_COLLECTION).find().toArray();
    if (users.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No user found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: users,
      });
    }
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const getUserById = async (req, res) => {
  console.log(req.session);
  const userId = req.params.userId;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const user = await db.collection(USERS_COLLECTION).findOne({ _id: userId });
    assert(1, user.matchedCount);
    res.status(200).json({
      status: 200,
      data: user,
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: "Unable to retrieve user",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
    if (!username || !password || !fullName || !email) {
      throw new Error("All fields are required!");
    }
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const userExist = await db
      .collection(USERS_COLLECTION)
      .findOne({ _id: username });
    if (userExist) {
      throw new Error("Please choose another username");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await db.collection(USERS_COLLECTION).insertOne({
      _id: username,
      password: hashedPassword,
      fullName: fullName,
      email: email,
    });
    assert(1, newUser.insertedCount);
    req.session.user_sid = username;
    console.log(req.session);
    res.status(200).json({
      status: 200,
      data: username,
      fullName,
      email,
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: e.message,
    });
  }
};

const authUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const user = await db
      .collection(USERS_COLLECTION)
      .findOne({ _id: username });
    assert(1, user.matchedCount);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user_sid = user._id;
      console.log(req.session);
      res.status(200).json({
        status: 200,
        data: "Successfully logged in",
      });
    } else {
      throw error;
    }
    client.close();
  } catch (e) {
    res.status(401).json({
      status: 401,
      data: "Login failed",
    });
  }
};

const updateUser = async (req, res) => {
  console.log(req.session);
  const { username, fullName, email } = req.body;
  const _id = username;
  const query = { _id };
  const newValues = {
    $set: { fullName: fullName, email: email },
  };
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const result = await db
      .collection(USERS_COLLECTION)
      .updateOne(query, newValues);
    assert.strictEqual(1, result.matchedCount);
    assert.strictEqual(1, result.modifiedCount);
    res.status(200).json({ status: 200, success: true });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: "Unable to perform action",
    });
  }
};

const deleteUser = async (req, res) => {
  console.log(req.session);
  const username = req.body.username;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const result = await db
      .collection(USERS_COLLECTION)
      .deleteOne({ _id: username });
    assert.strictEqual(1, result.deletedCount);
    res.status(200).json({ status: 200, success: true });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: "Unable to perform action",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  authUser,
  updateUser,
  deleteUser,
};
