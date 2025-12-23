const mongoose = require("mongoose");
const OrdersSchema = require("../schemas/OrdersSchema");

module.exports = mongoose.model("Order", OrdersSchema);
