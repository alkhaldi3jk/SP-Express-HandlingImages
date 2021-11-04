const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // slug: {type:String},
    image: { type: String },
    price: {
      type: Number,
      default: 5,
    },
    description: String,
    color: { type: String,
      //  enum: ["black", "red"]
       },
    quantity: {
      type: Number,
      min: 0,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Product", ProductSchema);
