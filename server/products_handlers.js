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
const PRODUCTS_COLLECTION = "products";

const getProducts = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const products = await db.collection(PRODUCTS_COLLECTION).find().toArray();
    if (products.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No products found",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: products,
      });
    }
    client.close();
  } catch (e) {
    console.log(e);
  }
};

const getProductsById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const product = await db
      .collection(PRODUCTS_COLLECTION)
      .findOne({ _id: ObjectID(productId) });
    assert(1, product.matchedCount);
    res.status(200).json({
      status: 200,
      data: product,
    });
    client.close();
  } catch (e) {
    res.status(400).json({
      status: 400,
      data: "Unable to retrieve product",
    });
  }
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const products = await db
      .collection(PRODUCTS_COLLECTION)
      .find({ category: category })
      .toArray();
    assert(products.length, products.matchedCount);
    res.status(200).json({
      status: 200,
      data: products,
    });
    client.close();
  } catch (e) {
    res.status(404).json({
      status: 404,
      data: "No products found",
    });
  }
};

const addProduct = async (req, res) => {
  const productId = ObjectID();
  try {
    const productName = req.body.productName;
    const description = req.body.description;
    const availableQuantity = req.body.availableQuantity;
    const image = req.body.image;
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const product = await db.collection(PRODUCTS_COLLECTION).insertOne({
      _id: productId,
      productName: productName,
      description: description,
      availableQuantity: availableQuantity,
      image: image,
    });
    assert(1, product.insertedCount);
    res.status(200).json({
      status: 200,
      success: true,
      data: {
        _id: productId,
        productName: productName,
        description: description,
        availableQuantity: availableQuantity,
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

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const productName = req.body.productName;
  const description = req.body.description;
  const availableQuantity = req.body.availableQuantity;
  const image = req.body.image;
  const category = req.body.category;
  const newValues = {
    $set: {
      productName: productName,
      description: description,
      availableQuantity: availableQuantity,
      image: image,
      category: category,
    },
  };
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const product = await db
      .collection(PRODUCTS_COLLECTION)
      .updateOne({ _id: ObjectID(productId) }, newValues);
    assert(1, product.matchedCount);
    assert(1, product.updatedCount);
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

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(APP_DB);
    const product = await db
      .collection(PRODUCTS_COLLECTION)
      .deleteOne({ _id: ObjectID(productId) });
    assert(1, product.deletedCount);
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
  getProducts,
  getProductsById,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
