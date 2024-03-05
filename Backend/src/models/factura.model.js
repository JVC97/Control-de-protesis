const mongoose = require("mongoose");
const protesisModel = require("./protesis.model");
const { Schema } = mongoose;

const FacturaSchema = new Schema({
    codigo: { type: String, required: true},
    fechaEmision: { type: String, required: true},
    monto: { type: Number, required: true},
    fechaPago: { type: String, required: false},
    listaProtesis:[{
        type: Schema.Types.ObjectId,
        ref: "protesis",
        required: true,
        autopopulate: true
    }]
});

FacturaSchema.method.rev = function(protesisId){
    let orden = this.listaProtesis.toString();
    return orden.includes(protesisId);
}

FacturaSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("factura", FacturaSchema);