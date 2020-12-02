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
const ADMIN_COLLECTION = "admin";

const registerAdmin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      throw new Error("All fields are required!");
    }
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const userExist = await db
      .collection(ADMIN_COLLECTION)
      .findOne({ _id: username });
    if (userExist) {
      throw new Error("Please choose another username");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await db.collection(ADMIN_COLLECTION).insertOne({
      _id: username,
      password: hashedPassword,
    });
    assert(1, newUser.insertedCount);
    req.session.user_sid = username;
    res.status(200).json({
      status: 200,
      data: username,
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: e.message,
    });
  }
};

const authAdmin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const user = await db
      .collection(ADMIN_COLLECTION)
      .findOne({ _id: username });
    assert(1, user.matchedCount);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user_sid = user._id;
      res.status(200).json({
        status: 200,
        data: "Successfully logged in",
        user_sid: req.session.user_sid,
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

module.exports = {
  authAdmin,
  registerAdmin,
};
