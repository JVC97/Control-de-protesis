let _visitaService = null;
class VisitaService {
  constructor({ VisitaService }) {
    _visitaService = VisitaService;
  }

  async get(req, res) {
    const { body } = req;
    const { _id } = body;
    const visita = await _visitaService.get(_id);
    return res.send(visita);
  }

  async update(req, res) {
    const { body } = req;
    const { _id } = body;
    const updatedVisita = await _visitaService.update(_id, body);
    return res.send(updatedVisita);
  }

  async delete(req, res) {
    const { body } = req;
    const { _id } = body;
    const deletedVisita = await _visitaService.delete(_id);
    return res.send(deletedVisita);
  }

  async getVisitaByProtesis(req, res) {
    const { body } = req;
    const { protesisId } = body;
    const visita = await _visitaService.getVisitaByProtesis(protesisId);
    return res.send(visita);
  }
  async createVisita(req, res) {
    const { body } = req;
    const createdVisita = await _visitaService.createVisita(body);
    return res.status(201).send(createdVisita);
  }
  
}

module.exports = VisitaService;
