// The memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");

// @route      GET api/v1/memory-cards
// @desc       Get all memory cards for a user by search term and order
// @access     Public
router.get("/", (req, res) => {
   db.query(
      selectAllCards(
         "6781066b-a2a5-4670-b473-213eb446b101",
         "ash",
         "`memory_cards`.`created_at` DESC"
      )
   )
      .then((dbRes) => {
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
