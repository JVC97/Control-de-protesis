const BaseRepository = require("./base.repository");
const path = require("path");

let _paciente = null;

class PacienteRepostory extends BaseRepository{
    constructor({ Paciente }){
        super(Paciente);
        _paciente = Paciente;
    }

    async getByRut(rut){
        return await _paciente.findOne({ rut });
    }

    async getByFicha(ficha){
        return await _paciente.findOne({ ficha });
    }

    async getByNom(nom){
        return await _paciente
        .find({$or: [{ nombre: {$regex: nom, $options: "i"}},
        {apellido: {$regex: nom, $options: "i"}},
        {ficha: {$regex: nom, $options: "i"}},
    {rut: {$regex: nom, $options: "i"}}]});
    }

    async getPorFacturar(protesisId){
        return await _paciente.find({ protesisId});
    }
}

module.exports = PacienteRepostory;