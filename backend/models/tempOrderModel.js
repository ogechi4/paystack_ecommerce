// models/tempOrderModel.js
import mongoose from "mongoose";

const tempOrderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    address: Object,
    amount: Number,
    paymentMethod: { type: String, default: "Paystack" },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

export default mongoose.model("TempOrder", tempOrderSchema);
