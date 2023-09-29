const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  //   first_name: { type: String, required: true },
  //   last_name: { type: String, required: true },
  username: { type: String, required: true },
  //   email_address: { type: String, required: true },
  password: { type: String, required: true },
  member_status: { type: Boolean, required: true },
  //   logged_in: { type: Boolean, required: true },
});

UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`;
  }

  return fullname;
});

UserSchema.virtual("url").get(function () {
  return `/home/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
