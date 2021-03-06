"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    address: {
        type: Object
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
