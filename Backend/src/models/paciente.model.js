const mongoose = require("mongoose");
const protesisModel = require("./protesis.model");
const visitaModel = require("./visita.model");
const { findOne } = require("./visita.model");
const {Schema} = mongoose;

const PacienteSchema = new Schema({
    name: { type: String, required: true},
    lastName: { type: String, required: true},
    file: { type: String, required: true},
    rut: { type: String, required: true},
    address: { type: String, required: true},
    telephone: { type: String, required: true},
    gender: { type: String, required: true},
    birthdate: { type: String, required: true},
    prosthesisList: [{
        type: Schema.Types.ObjectId,
        ref: "protesis",
        required: true,
        autopopulate: true
    }]
});

PacienteSchema.pre("findOneAndDelete", async function(next){
    let pac = this.getQuery();
    let {_id} = pac;

    const paci = await protesisModel.find({pacienteId: pac}).distinct("_id");

    await visitaModel.deleteMany({protesisId: {$in: [paci]}});
    await protesisModel.deleteMany({pacienteId: pac});
    next();
});

PacienteSchema.plugin(require("mongoose-autopopulate"));

PacienteSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("paciente", PacienteSchema);