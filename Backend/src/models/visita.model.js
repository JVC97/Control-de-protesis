const mongoose = require("mongoose");
const { Schema } = mongoose;

const VisitaSchema = new Schema({
  detalle: { type: String, required: true },
  comentario: { type: String, required: false},
  fotos: [{type:String,required:false}],
  fecha: {type:String, required: true},
  protesisId: {
    type: Schema.Types.ObjectId,
    ref: "protesis",
    required: true,
    autopopulate: false
  }
}
);

VisitaSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("visita", VisitaSchema);
