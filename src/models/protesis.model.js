const mongoose = require("mongoose");
const licitacionModel =require("./licitacion.model");
const visitaModel = require("./visita.model");
const ordenCompraModel = require("");
const { findOne } = require("./visita.model");
const { Schema } = mongoose;

const ProtesisSchema = new Schema({
    anamnesis: { type: String, required: true},
    type: { type: String, required: true},
    foot: { type: String, required: true},
    patient: {
        type: Schema.Types.ObjectId,
        ref: "paciente",
        required: true,
        autopopulate: true
    },
    listaVisitas: [{
        type: Schema.Types.ObjectId,
        ref: "visita",
        required: true,
        autopopulate: true
    }],
    ordenCompra: {},
    facturaID: {},
    licitacionId: {
        type: Schema.Types.ObjectId,
        ref: "licitacion",
        required: false,
        autopopulate: false
    }
});

ProtesisSchema.pre("findOneAndDelete", async function(next){
    let proc = this.getQuery();
    let {_id} = proc;
    await visitaModel.find({protesisID: _id}).remove().exec();
    next();
});

ProtesisSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("protesis", ProtesisSchema);