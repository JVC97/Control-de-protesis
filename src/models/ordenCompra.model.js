const mongoose = require("mongoose");
const { Schema } = mongoose;
const protesisModel = require("./protesis.model");

const OrdenCompraSchema = new Schema({
    codigo: { type: String, required: true},
    fecha: { type: String, required: true},
    listProtesis: [{
        type: Schema.Types.ObjectId,
        ref: "protesis",
        required: true,
        autopopulate: true
    }]
});

OrdenCompraSchema.methods.rev = function(protesisId){
    let orden = this.listProtesis.toString();
    return orden.includes(protesisId);
};

OrdenCompraSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.exports("ordenCompra", OrdenCompraSchema);