require("dotenv").config();

const mongoose = require("mongoose");

const Admin = require("../models/Admin");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  const exist = await Admin.findOne({
    email: "admin@nhdc.com",
  });

  if (exist) {
    console.log("Super Admin already exists");

    process.exit();
  }

  await Admin.create({
    firstName: "Super",

    lastName: "Admin",

    email: "admin@nhdc.com",

    password: "Admin@123",

    role: "SUPER_ADMIN",
  });

  console.log("Super Admin Created");

  process.exit();
}

run();
