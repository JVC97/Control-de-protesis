const BaseService = require("./base.service");
const path = require("path");

let _pacienteRepository = null;

class PacienteService extends BaseService{
    constructor({ PacienteRepository }){
        super(PacienteRepository);
        _pacienteRepository = PacienteRepository;
    }

    async getPacientebyRut(rut){
        return await _pacienteRepository.getByRut(rut);
    }

    async getByNom(nombre){
        return await _pacienteRepository.getByNom(nombre);
    }

    async createPaciente(paciente){
        const { rut, ficha } = paciente;
        const userExist = await _pacienteRepository.getByRut(rut);
        const userExist2 = await _pacienteRepository.getByFicha(ficha);
        
        if(userExist){
            const error = new Error();
            error.status = 400;
            error.message = "Paciente ya existe";
            throw error;
        }

        if(userExist2){
            const error = new Error();
            error.status = 400;
            error.message = "Ficha ya existe";
            throw error;
        }

        return await _pacienteRepository.create(paciente);
    }
}

module.exports = PacienteService;