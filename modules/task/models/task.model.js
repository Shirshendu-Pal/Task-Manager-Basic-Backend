const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
// const { taskTypes } = require("../../../configuration/constant");

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define the token schema
const tasksSchema = mongoose.Schema({
  id: {
   type: String,
   default: () => "SOC" + nanoid(12),
   unique: true,
  },
  taskName: String,
  status:{
   type: Boolean,
   default: false
  },
  isDeleted:{
   type: Boolean,
   default: false
  }

},{ timestamps: true});

// Hash password before saving

// Plugin for pagination
tasksSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("Task", tasksSchema);
