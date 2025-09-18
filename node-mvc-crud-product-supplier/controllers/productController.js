const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

module.exports = {
  index: async (req, res) => {
    try {
      // Optional filter by supplier
      const { supplier } = req.query;
      const query = {};
      if (supplier) query.supplier = supplier;

      const products = await Product.find(query)
        .populate("supplier")
        .sort({ createdAt: -1 });
      const suppliers = await Supplier.find({});
      res.render("products/index", {
        products,
        suppliers,
        selectedSupplier: supplier || "",
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  newForm: async (req, res) => {
    try {
      const suppliers = await Supplier.find({});
      res.render("products/new", { suppliers });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  create: async (req, res) => {
    try {
      const { name, price, quantity, supplier } = req.body;
      await Product.create({
        name,
        price: Number(price),
        quantity: Number(quantity),
        supplier,
      });
      res.redirect("/products");
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  editForm: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).send("Product not found");
      const suppliers = await Supplier.find({});
      res.render("products/edit", { product, suppliers });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  update: async (req, res) => {
    try {
      const { name, price, quantity, supplier } = req.body;
      await Product.findByIdAndUpdate(
        req.params.id,
        { name, price: Number(price), quantity: Number(quantity), supplier },
        { runValidators: true }
      );
      res.redirect("/products");
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  delete: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect("/products");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
