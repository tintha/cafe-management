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
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const users = await db
      .collection(USERS_COLLECTION)
      .find({ isAdmin: { $eq: false } })
      .toArray();
    if (users.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No user found",
      });
    } else {
      const excludePassword = users.map((user) => {
        return {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
        };
      });
      res.status(200).json({
        status: 200,
        data: excludePassword,
      });
    }
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId.toLowerCase();
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const user = await db.collection(USERS_COLLECTION).findOne({ _id: userId });
    assert(1, user.matchedCount);
    res.status(200).json({
      status: 200,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        isAdmin: user.isAdmin,
      },
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
  let letters = /^[A-Za-z]+$/;
  let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  try {
    const username = req.body.username.toLowerCase();
    const { password, firstName, lastName, email } = req.body;
    if (!username || !password || !firstName || !lastName || !email) {
      throw new Error("All fields are required!");
    } else if (!firstName.match(letters) || !lastName.match(letters)) {
      throw new Error("Names can only contain letters!");
    } else if (!email.match(emailRegex)) {
      throw new Error("Invalid email address!");
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
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: "",
      isAdmin: false,
    });
    assert(1, newUser.insertedCount);
    req.session.user_sid = username;
    res.status(200).json({
      status: 200,
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: "",
        isAdmin: false,
        user_sid: req.session.user_sid,
      },
    });
    client.close();
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: e.message,
    });
  }
};

const authUser = async (req, res) => {
  try {
    const username = req.body.username.toLowerCase().trim();
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
      res.status(200).json({
        status: 200,
        message: "Successfully logged in",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          address: user.address,
          user_sid: req.session.user_sid,
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "Login failed",
      });
    }
    client.close();
  } catch (e) {
    res.status(401).json({
      status: 401,
      message: "Login failed",
    });
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const _id = req.params.userId.toLowerCase();
  const query = { _id };
  const newValues = {
    $set: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
    },
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
  const username = req.params.userId.toLowerCase();
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

const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "error",
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
      });
    }
  });
};

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  authUser,
  updateUser,
  deleteUser,
  logoutUser,
};
