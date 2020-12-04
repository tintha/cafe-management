"use strict";
const { MongoClient } = require("mongodb");
const { ObjectID } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const APP_DB = "cb-final";
const ITEMS_COLLECTION = "items";

const getItems = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const items = await db.collection(ITEMS_COLLECTION).find().toArray();
    if (items.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No items found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: items,
      });
    }
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const getItemById = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const item = await db
      .collection(ITEMS_COLLECTION)
      .findOne({ _id: ObjectID(itemId) });
    assert(1, item.matchedCount);
    res.status(200).json({
      status: 200,
      data: item,
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: "Unable to retrieve item",
    });
  }
};

const getItemsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const items = await db
      .collection(ITEMS_COLLECTION)
      .find({ category: category })
      .toArray();
    assert(items.length, items.matchedCount);
    res.status(200).json({
      status: 200,
      data: items,
    });
    client.close();
  } catch (e) {
    res.status(404).json({
      status: 404,
      data: "No items found",
    });
  }
};

const addItem = async (req, res) => {
  const itemId = ObjectID();
  try {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const image = req.body.image;
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const item = await db.collection(ITEMS_COLLECTION).insertOne({
      _id: itemId,
      itemName: itemName,
      description: description,
      image: image,
    });
    assert(1, item.insertedCount);
    res.status(200).json({
      status: 200,
      success: true,
      data: {
        _id: itemId,
        itemName: itemName,
        description: description,
        image: image,
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

const updateItem = async (req, res) => {
  const itemId = req.params.itemId;
  const itemName = req.body.itemName;
  const description = req.body.description;
  const image = req.body.image;
  const newValues = {
    $set: {
      itemName: itemName,
      description: description,
      image: image,
    },
  };
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const item = await db
      .collection(ITEMS_COLLECTION)
      .updateOne({ _id: ObjectID(itemId) }, newValues);
    assert(1, item.matchedCount);
    assert(1, item.updatedCount);
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

const deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const item = await db
      .collection(ITEMS_COLLECTION)
      .deleteOne({ _id: ObjectID(itemId) });
    assert(1, item.deletedCount);
    res.status(200).json({
      status: 200,
      itemId: itemId,
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
  getItems,
  getItemById,
  getItemsByCategory,
  addItem,
  updateItem,
  deleteItem,
};
