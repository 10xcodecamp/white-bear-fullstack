// The queue resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const validateJwt = require("../../utils/validateJwt");

// @route      POST api/v1/test-users
// @desc       Create a new test user in the test users resource
// @access     Private
router.post("/", validateJwt, (req, res) => {
   const userId = req.user.id;
   console.log("made it to test-users route");
});

module.exports = router;
