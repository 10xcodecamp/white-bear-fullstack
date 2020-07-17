// https://stackoverflow.com/q/40494050/6305196

require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const bucket = "demo-whitebear";

const s3Config = new aws.S3({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   bucket: bucket,
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

const multerS3Config = multerS3({
   s3: s3Config,
   bucket: bucket,
   metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
   },
   key: function (req, file, cb) {
      console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
   },
});

const upload = multer({
   storage: multerS3Config,
   fileFilter: fileFilter,
   limits: {
      fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
   },
});

module.exports = upload;
