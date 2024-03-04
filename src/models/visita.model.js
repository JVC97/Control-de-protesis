const mongoose = require("mongoose");
const {Schema} = mongoose;

const VisitaSchema = new Schema({
    detail: { type: String, required: true},
    comment: { type: String, required: false},
    pictures: [{ type: String, required: false}],
    date: { type: String, required: true},
    protesisID:{
        type: Schema.Types.ObjectId,
        ref: "protesis",
        required: true,
        autopopulate: false
    }
});

VisitaSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("visita", VisitaSchema);