"use strict";
const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const APP_DB = "cb-final";
const CATEGORIES_COLLECTION = "categories";

const getCategories = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const categories = await db
      .collection(CATEGORIES_COLLECTION)
      .find()
      .toArray();
    if (categories.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No categories found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: categories,
      });
    }
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const addCategory = async (req, res) => {
  const categoryName = req.body.categoryName;
  const categoryId = req.body.categoryName.toLowerCase();
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const category = await db.collection(CATEGORIES_COLLECTION).insertOne({
      _id: categoryId,
      categoryName: categoryName,
    });
    assert(1, category.insertedCount);
    res.status(200).json({
      status: 200,
      data: {
        _id: categoryId,
        categoryName: categoryName,
      },
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: e.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.catId;
  const categoryName = req.body.categoryName;
  const newValues = {
    $set: {
      categoryName: categoryName,
    },
  };
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const category = await db
      .collection(CATEGORIES_COLLECTION)
      .updateOne({ _id: categoryId }, newValues);
    assert(1, category.matchedCount);
    assert(1, category.updatedCount);
    res.status(200).json({
      status: 200,
      success: true,
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: "Unable to perform action",
    });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.catId;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const category = await db
      .collection(CATEGORIES_COLLECTION)
      .deleteOne({ _id: categoryId });
    assert(1, category.deletedCount);
    res.status(204).json({
      status: 204,
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: "Unable to perform action",
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
