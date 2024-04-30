const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
	invoiceId: {
		type: String,
		unique: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "owner",
	},
	trip: {
		type: Schema.Types.ObjectId,
		ref: "Trip",
	},
	car: {
		type: Schema.Types.ObjectId,
		ref: "Car",
	},
	model: {
		type: String,
		required: true,
	},
	dayQty: {
		type: Number,
		required: true,
	},
	offroad: {
		type: Number,
		default: 0,
	},
	dayRate: {
		type: Number,
		required: true,
	},
	dayAmount: {
		type: Number,
		required: true,
	},
	kmQty: {
		type: Number,
		required: true,
	},
	kmRate: {
		type: Number,
		required: true,
	},
	kmAmount: {
		type: Number,
		required: true,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	from: {
		type: Date,
	},
	fromkm: Number,
	tokm: Number,
	to: {
		type: Date,
	},
	invoiceDate: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ["paid", "pending", "unpaid"],
		default: "pending",
	},
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
