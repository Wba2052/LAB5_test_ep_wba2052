const Supplier = require("../models/Supplier");

module.exports = {
  index: async (req, res) => {
    try {
      const suppliers = await Supplier.find({}).sort({ createdAt: -1 });
      res.render("suppliers/index", { suppliers });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  newForm: (req, res) => {
    res.render("suppliers/new");
  },

  create: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      await Supplier.create({ name, address, phone });
      res.redirect("/suppliers");
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  editForm: async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) return res.status(404).send("Supplier not found");
      res.render("suppliers/edit", { supplier });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  update: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      await Supplier.findByIdAndUpdate(
        req.params.id,
        { name, address, phone },
        { runValidators: true }
      );
      res.redirect("/suppliers");
    } catch (err) {
      res.status(400).send(err.message);
    }
  },

  delete: async (req, res) => {
    try {
      await Supplier.findByIdAndDelete(req.params.id);
      // Note: products referencing this supplier will remain unless you implement cascading logic.
      res.redirect("/suppliers");
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
