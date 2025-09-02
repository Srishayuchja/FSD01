const Product = require('../models/product');             
const { applyHelper } = require('../utils/additionalHelpers');

// GET allProducts  (list with filter/sort/search/paginate/select)
exports.getAllProducts = async (req, res, next) => {
  try {
    const { query, page, limit, filters } = applyHelper(Product, req.query);

    const [items, total] = await Promise.all([
      query.exec(),
      Product.countDocuments(filters)
    ]);

    res.json({
      page,
      limit,
      total,
      count: items.length,
      data: items
    });
  } catch (err) {
    next(err);
  }
};


// GET singleProduct
exports.getSingleProduct = async (req, res, next) => {
  try {
    const doc = await Product.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Product not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};


// CREATE product
exports.createProduct = async (req, res, next) => {
  try {
    // Basic  validation 
    if (!req.body.name || !req.body.sku || typeof req.body.price === 'undefined') {
      return res.status(400).json({ error: 'name, sku, and price are required' });
    }

    const doc = await Product.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    // handle duplicate sku
    if (err.code === 11000) {
      return res.status(409).json({ error: 'SKU must be unique' });
    }
    next(err);
  }
};

// UPDATE product
exports.editProduct = async (req, res, next) => {
  try {
    const doc = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, overwrite: true }
    );
    if (!doc) return res.status(404).json({ error: 'Product not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// DELETE product
exports.deleteProduct = async (req, res, next) => {
  try {
    const doc = await Product.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Product not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};