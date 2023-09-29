const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true, minlength: 1, maxlength: 300 },
  timestamp: { type: Date, default: Date.now, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// MessageSchema.virtual()

module.exports = mongoose.model("Message", MessageSchema);
