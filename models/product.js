const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
  price: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, default: true },
  quantity: { type: Number, default: 0, min: 0 },
  category: { type: String, trim: true, index: true },
  tags: [{ type: String, trim: true }],
  releaseDate: { type: Date },
  description: { type: String, trim: true },
  rating: { type: Number, min: 0, max: 5, default: 0 }
}, { timestamps: true });








const Product = mongoose.model('Product', productSchema);

module.exports = Product;


