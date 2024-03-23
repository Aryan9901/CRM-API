const mongoose = require("mongoose");

const { Schema } = mongoose;

// car Schema
const carSchema = new Schema(
	{
		registrationNo: {
			type: String,
			required: [true, "registration Number is required"],
			minLength: [10, "Registration Number should be 10 characters long"],
			maxLength: [10, "Registration Number should be 10 characters long"],
		},
		brand: {
			type: String,
			required: [true, "Brand is required"],
		},
		model: {
			type: String,
			required: [true, "Model is required"],
		},
		make: {
			type: String,
		},
		trip: [
			{
				type: Schema.Types.ObjectId,
				ref: "trip",
			},
		],
		features: {
			capacity: {
				type: Number,
				min: [1, "Capacity should not be less than 1"],
			},
			type: {
				type: String,
				enum: ["AC", "NON-AC"],
			},
			maxSpeed: {
				type: Number,
			},
		},
		rate: {
			km: {
				type: Number,
				min: [0, "Rate should not be 0"],
			},
			date: {
				type: Number,
				min: [0, "Rate should not be 0"],
			},
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
						// Validate that start date is not in the past
						return value >= new Date();
					},
					message: "Start date should not be from past",
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
						return value >= this.start.date;
						// return value <= new Date() && value >= this.start.date;
					},
					message: "End date should not be in the future and should not be less than start date",
				},
			},
		},
		maintenance: [
			{
				year: {
					type: Number,
					required: [true, "Year is required (20XX)"],
				},
				month: {
					type: Number,
					required: [true, "Month is required (1-12)"],
				},
				amount: {
					type: Number,
					required: [true, "Amount is required"],
				},
			},
		],
		district: {
			type: String,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "owner", // This should match the model name of your owner schema
		},
	},
	{ timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
