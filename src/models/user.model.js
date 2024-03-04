const mongoose = require("mongoose");
const {Schema} = mongoose;
const {compareSync, hashSync, genSaltSync} = require("bcryptjs");

const UserSchema = new Schema({
    name: { type: String, require: true},
    lastname: { type: String, require: true},
    email: { type: String, require: true},
    telphone: { type: String, require: true},
    address: { type: String, require: true},
    admin: { type: Boolean, require: true},
    photo: { type: String, require: true},
    password: { type: String, require: true}
},
{
    _id: true
}
);

//return user
UserSchema.method.toJSON =function(){
    let user = this.toObject();
    delete user.password
    return user;
};

//Compare password
UserSchema.method.comparePassword = function(password){
    return compareSync(password, this.password);
};

UserSchema.pre("save", async function(next){
    const user = this;

    if(!user.isModified("password")){
        return next()
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password= hashedPassword;
});

UserSchema.pre("findOneAndUpdate", function(next){
    let query = this;
    let update = query.getUpdate();

    if(!update.password){
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(update.password, salt);
    update.password = hashedPassword;
    next();
});

module.exports = mongoose.model("user", UserSchema);