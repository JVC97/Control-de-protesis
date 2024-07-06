const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");
const UserSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: {type: String, required: true },
  email: { type: String, required: true },
  telefono: {type: String, required: true },
  direccion: {type: String, required:  true },
  admin: {type: Boolean, required: true },
  foto: {type: String, required:false},
  password: { type: String, required: true }
},
{
  _id: true
}
);

UserSchema.methods.toJSON = function() {
  let user = this.toObject();
  delete user.password
  return user;
};

UserSchema.methods.comparePasswords = function(password) {
  return compareSync(password, this.password);
};



UserSchema.pre("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
  
});

UserSchema.pre('findOneAndUpdate', function (next) {
  let query = this;
  let update = query.getUpdate();

  if (!update.password) {
      return next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(update.password, salt);
  update.password = hashedPassword;
  next();

});

module.exports = mongoose.model("user", UserSchema);
