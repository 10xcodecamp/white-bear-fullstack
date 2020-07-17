// The queue resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const validateJwt = require("../../utils/validateJwt");
const upload = require("../../upload");

// @route      POST api/v1/test-users
// @desc       Create a new test user in the test users resource
// @access     Private
router.post("/", validateJwt, upload.single("profilePhoto"), (req, res) => {
   console.log("hit test-users API");
   const userId = req.user.id; // TODO: remove?
   console.log(req.body.handle);
   console.log(req.file);
});

module.exports = router;
