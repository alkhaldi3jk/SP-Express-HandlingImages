const Shop = require("../../db/models/Shop");
const Product=require("../../db/models/Product")



exports.shopListFetch=async(req, res, next) => {
    try {
      const shop = await Shop.find().populate('products');
      return res.json(shop);
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: error.message });
    }
  };
  
exports.shopCreate= async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const newShop = await Shop.create(req.body);
      res.status(201).json(newShop);
    } catch (error) {
      next(error);
    }
  };

  exports.productCreate = async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const shopId = req.params.shopId;
      req.body = { ...req.body, shop: shopId };
      const newProduct = await Product.create(req.body)
      await Shop.findOneAndUpdate(
        { _id: shopId },
        { $push: { products: newProduct._id } },
      );
     return res.status(201).json(newProduct);
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
    //   const newProduct = await Product.create(req.shopId);
    //   await newProduct.findOneAndUpdate(req.body)
    //   res.status(201).json(newProduct);
    // } catch (error) {
    //   next(error);
    // }
  };
  