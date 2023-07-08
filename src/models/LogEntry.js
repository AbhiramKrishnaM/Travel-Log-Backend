const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredNumber = { type: Number, required: true };

const logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    body: String,
    comments: String,
    rating: { type: Number, min: 0, max: 10, default: 0 },
    image: String,
    latitude: requiredNumber,
    longitude: requiredNumber,
    visitDate: { required: true, type: Date },
  },
  {
    timestamps: true,
  }
);
