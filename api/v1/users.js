// The users resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const { toHash } = require("../../utils/helpers");
const getCreateEmailError = require("../../validation/getCreateEmailError");
const getCreatePasswordError = require("../../validation/getCreatePasswordError");

// @route      POST api/v1/users
// @desc       Create a new user
// @access     Public
router.post("/", async (req, res) => {
   const { id, email, password, createdAt } = req.body;
   const emailError = await getCreateEmailError(email);
   const passwordError = getCreatePasswordError(password, email);
   let mysqlError = "";
   if (emailError === "" && passwordError === "") {
      const user = {
         id,
         email,
         password: await toHash(password),
         created_at: createdAt,
      };
      db.query(insertUser, user)
         .then(() => {
            // return the user data so we can put in redux store
            db.query(selectUserById, id)
               .then((users) => {
                  const user = users[0];
                  res.json({
                     id: user.id,
                     email: user.email,
                     createdAt: user.created_at,
                  });
               })
               .catch((err) => {
                  mysqlError = `${err.code} ${err.sqlMessage}`;
                  console.log(mysqlError);
                  res.status(400).json({
                     mysqlError,
                     emailError,
                     passwordError,
                  });
               });
         })
         .catch((err) => {
            mysqlError = `${err.code} ${err.sqlMessage}`;
            console.log(mysqlError);
            res.status(400).json({ mysqlError, emailError, passwordError });
         });
   } else {
      res.status(400).json({ mysqlError, emailError, passwordError });
   }
});

module.exports = router;
