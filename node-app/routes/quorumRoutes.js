const express = require("express");
const router = express.Router();

const quorumController = require("../controllers/quorumController");

router.get("/quorum", quorumController.getQuorum);

module.exports = router;