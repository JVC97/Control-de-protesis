const mongoose = require("mongoose");
const { Schema } = mongoose;
const protesisModel = require("./protesis.model");

const LicitacionSchema = new Schema({
  codigo: { type: String, required: true },
  monto: {type: Number, required:true},
  fechaPago: { type: String, required: false },
  fecha: {type: String, required:true},
  listprotesis: [{
      type: Schema.Types.ObjectId,
      ref:"protesis",
      required:true,
      autopopulate: true
  }]
},
);
LicitacionSchema.methods.rev =function(protesisId){
    let licita = this.listprotesis.toString();
    return licita.includes(protesisId);
  }


LicitacionSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("licitacion", LicitacionSchema);