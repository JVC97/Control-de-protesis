const mongoose = require("mongoose");
const { Schema } = mongoose;
const protesisModel = require("./protesis.model");

const LicitacionSchema = new Schema({
    codigo: {type: Number, required: true },
    monto: {type: String, required: true },
    fechaPago: {type: String, required: false },
    fecha: {type: String, required: true },
    listProtesis: [{
        type: Schema.Types.ObjectId,
        ref: "protesis",
        required: true,
        autopopulate: true
    }]
}); 

LicitacionSchema.method.rev = function(protesisId){
    let licita = this.listProtesis.toString();
    return licita.includes(protesisId);
}

LicitacionSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("licitacion", LicitacionSchema);