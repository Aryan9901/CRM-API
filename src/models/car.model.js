const mongoose = require("mongoose");

const { Schema } = mongoose;

// car Schema
const carSchema = new Schema(
	{
		registrationno: {
			type: String,
			required: [true, "registration Number is required"],
			minLength: [9, "Registration Number should be 9 characters long"],
			maxLength: [9, "Registration Number should be 9 characters long"],
		},
		brand: {
			type: String,
			required: [true, "Brand is required"],
		},
		model: {
			type: String,
			required: [true, "Model is required"],
		},
		frvcode: {
			type: String,
			required: [true, "FRV Code is required"],
		},
		features: {
			capacity: Number,
			type: String,
			speed: Number,
		},
		start: {
			km: {
				type: Number,
				min: [0, "Start KM should not be less than 0"],
				max: [1000000, "Start KM should not be more than 1000000"],
			},
			date: {
				type: Date,
				validate: {
					validator: function (value) {
						// Validate that start date is not in the future
						return value <= new Date();
					},
					message: "Start date should not be in the future",
				},
			},
		},
		end: {
			km: {
				type: Number,
				validate: {
					validator: function (value) {
						// Validate that end km is greater than start km
						return value >= this.start.km;
					},
					message: "End KM should not be less than start KM",
				},
				min: [0, "End KM should not be less than 0"],
				max: [1000000, "End KM should not be more than 1000000"],
			},
			date: {
				type: Date,
				validate: {
					validator: function (value) {
						// Validate that end date is not in the future and greater than start date
						return value <= new Date() && value >= this.start.date;
					},
					message: "End date should not be in the future and should not be less than start date",
				},
			},
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "Owner", // This should match the model name of your owner schema
		},
	},
	{ timestamps: true }
);

const Car = mongoose.model("car", carSchema);
module.exports = Car;
