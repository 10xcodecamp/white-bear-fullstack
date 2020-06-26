// The 'users' resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route      GET api/v1/users
// @desc       Gets a valid user
// @access     Public
router.get("/", (req, res) => {
   db.query(selectUser("mike@gmail.com", "replace_me"), (err, dbRes) => {
      if (err) {
         console.log(err);
         res.status(400).json(err);
      } else {
         const user = toSafeParse(toJson(dbRes))[0];
         console.log(user);
         res.json(user);
      }
   });
});

module.exports = router;
