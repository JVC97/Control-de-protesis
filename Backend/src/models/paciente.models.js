const mongoose = require("mongoose");
const protesisModel = require("./protesis.model");
const visitaModel = require("./visita.model");
const { findOne } = require("./visita.model");
const { Schema } = mongoose;

const PacienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: {type: String, required: true},
  ficha: {type: String, required: true},
  rut: { type: String, required: true },
  direccion: { type: String, required: true  },
  telefono: { type: String, required: true },
  sexo: {type: String, required: true},
  fechaNacimiento: {type: String, required: true},
  listprotesis: 
    [{
      type: Schema.Types.ObjectId,
      ref: "protesis",
      required: true,
      autopopulate: true
      
    }
  ]
}
);

PacienteSchema.pre('findOneAndDelete',  async function(next) {
  let pac = this.getQuery()._id;
  const aaa = await protesisModel.find({pacienteId: pac}).distinct("_id");
  console.log(aaa);
  await visitaModel.deleteMany({protesisId: {$in:[aaa]}});
  await protesisModel.deleteMany({pacienteId: pac});
  
  //await visitaModel.deleteMany({protesisId: {$in : {protesisModel.find({pacienteId: _id})}}});
  next();
});
PacienteSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("paciente", PacienteSchema);
