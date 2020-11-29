const router = require("express").Router();

const { getData } = require("./handlers");

router.get("/test", getData);

module.exports = router;
