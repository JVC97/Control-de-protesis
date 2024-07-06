const mongoose = require("mongoose");
const visitaModel = require("./visita.model");
const licitacionModels = require("./licitacion.models");
const ordenCompraModels = require("./ordenCompra.models");
const facturaModels = require("./factura.models");
const { Schema } = mongoose;

const ProtesisSchema = new Schema({
  anamnesis: { type: String, required: true },
  tipo: { type: String, required: true },
  pie: { type: String, required: true },
  pacienteId: {
    type: Schema.Types.ObjectId,
    ref: "paciente",
    required: true,
    autopopulate: false
  },
  listvisita: [
    {
      type: Schema.Types.ObjectId,
      ref: "visita",
      required: true,
      autopopulate: true
    }
  ],
  ordenCompra:{
    type: Schema.Types.ObjectId,
    ref: "ordenCompra",
    required:false
  },
  facturaId:{
    type: Schema.Types.ObjectId,
    ref: "factura",
    required:false,
    autopopulate: false
  },
  licitacionId:{
    type: Schema.Types.ObjectId,
    ref: "licitacion",
    required:false,
    autopopulate: false
  }
}
);



ProtesisSchema.pre('findOneAndDelete',  async function(next) {
  let proc = this.getQuery();
  let {_id} = proc;
  console.log("aaa");
  await visitaModel.find({protesisId: _id}).remove().exec();
  next();
});



ProtesisSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("protesis", ProtesisSchema);
