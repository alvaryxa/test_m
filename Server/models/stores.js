const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  address: {
    type: String,
    require: true,
    trim: true
  },
  phone: Number
});
const Store = mongoose.model("Store", storeSchema);

module.exports = { Store };
