// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Supplier = require("./models/Supplier");
const Product = require("./models/Product");

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Xóa dữ liệu cũ (nếu có)
    await Supplier.deleteMany({});
    await Product.deleteMany({});

    // Tạo dữ liệu mẫu
    const suppliers = await Supplier.insertMany([
      { name: "Supplier A", contactInfo: "supplierA@example.com" },
      { name: "Supplier B", contactInfo: "supplierB@example.com" },
    ]);

    const products = await Product.insertMany([
      { name: "Product 1", price: 100, supplier: suppliers[0]._id },
      { name: "Product 2", price: 200, supplier: suppliers[1]._id },
    ]);

    console.log("Seed completed:", { suppliers, products });
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seed();
