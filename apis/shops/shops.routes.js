const express = require("express");
const Shop = require("../../db/models/Shop");

const upload = require("../../middleware/multer");
const {
  shopCreate,
  productCreate,
  shopListFetch,
} = require("./shops.controllers");

const router = express.Router();

router.get("/", shopListFetch);

router.post("/",    upload.single("image"),
shopCreate);
router.post(
  "/:shopId/products",
    upload.single("image"),
    productCreate
);

module.exports = router;
