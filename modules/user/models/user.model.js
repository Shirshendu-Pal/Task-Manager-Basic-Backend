const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require("bcryptjs");

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define the user schema
const userSchema = new mongoose.Schema({
   name: String
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        console.log('Hashed Password:', this.password);
    }
    next();
});

// Plugin for pagination
userSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("User", userSchema);
