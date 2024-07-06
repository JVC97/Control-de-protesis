const BaseService = require("./base.service");
let _visitaRepository = null,
    _protesisRepository = null;

class VisitaService extends BaseService {
  constructor({ VisitaRepository, ProtesisRepository }) {
    super(VisitaRepository);
    _visitaRepository = VisitaRepository;
    _protesisRepository = ProtesisRepository;
  }

  async getVisitaByProtesis(protesis){
    return await _visitaRepository.getVisitaByProtesis(protesis);
  }
  async createVisita(visita) {
    const {protesisId}=visita;
    const protes = await _protesisRepository.get(protesisId);
    if(!protes){
      const error = new Error();
      error.status = 404;
      error.message = "protesis no existe";
      throw error;
    }
    const createvisita = await _visitaRepository.create(visita);
    protes.listvisita.push(createvisita);

    return await _protesisRepository.update(protesisId, { listvisita: protes.listvisita});
  }
}

module.exports = VisitaService;
