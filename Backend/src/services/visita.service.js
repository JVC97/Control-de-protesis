const BaseService = require("./base.service");
let _visitaRepository = null;
let _protesisRepository = null;

class VisitaService extends BaseService{
    constructor({VisitaRepository, ProtesisRepository}){
        super(VisitaRepository);
        _visitaRepository = VisitaRepository;
        _protesisRepository = ProtesisRepository;
    }

    async getVisitaByProtesis(protesis){
        return await _visitaRepository.getVisitaByProtesis(protesis);
    }

    async createVisita(visita){
        const {protesisId} = visita;
        const protesis = await _protesisRepository.get(protesisId);
        if(!protesis){
            const error = new Error();
            error.status = 404;
            error.message = "Protesis no existe";
            throw error;
        }

        const createVisita = await _visitaRepository.create(visita);
        protesis.listvisita.push(createVisita);

        return await _protesisRepository.update(protesisId, {listvisita: protesis.listvisita});
    }
}

module.exports = VisitaService;