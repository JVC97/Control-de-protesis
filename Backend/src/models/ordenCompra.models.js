const mongoose = require("mongoose");
const { Schema } = mongoose;
const protesisModel = require("./protesis.model");

const OrdeonCompraSchema = new Schema({
  codigo: { type: String, required: true },
  fecha: { type: String, required: true },
  listprotesis: [{
      type: Schema.Types.ObjectId,
      ref:"protesis",
      required:true,
      autopopulate: true
  }]
},
);

OrdeonCompraSchema.methods.rev =function(protesisId){
  let orden = this.listprotesis.toString();
  return orden.includes(protesisId);
}



OrdeonCompraSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("ordenCompra", OrdeonCompraSchema);