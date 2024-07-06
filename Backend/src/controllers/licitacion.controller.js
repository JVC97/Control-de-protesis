let _licitacionService = null;
class LicitacionController {
  constructor({ LicitacionService }) {
    _licitacionService = LicitacionService;
  }

  async get(req, res) {
    const { _id}= req.params;
    const licitacion = await _licitacionService.get(_id);
    return res.send(licitacion);
  }

  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    const licitacion = await _licitacionService.getAll(pageSize, pageNum);
    return res.send(licitacion);
  }

  async update(req, res) {
    const { body } = req;
    const { _id } = body;
    const updatedLicitacion = await _licitacionService.update(_id, body);
    return res.send(updatedLicitacion);
  }

  async delete(req, res) {
    const { body } = req;
    const { _id } = body;
    const deletedLicitacion = await _licitacionService.delete(_id);
    return res.send(deletedLicitacion);
  }
  async createLicitacion(req, res) {
    const { body } = req;
    const createLicitacion = await _licitacionService.createLicitacion(body);
    return res.status(201).send(createLicitacion);
  }
  async getPorAsignar(req, res) {
    const { pageSize, pageNum } = req.query;
    const licitacion = await _licitacionService.getPorAsignar(pageSize, pageNum);
    return res.send(licitacion);
  }
  async getByNom(req, res) {
    const {codigo} = req.params;
    const paciente = await _licitacionService.getByNom(codigo);
    return res.send(paciente);
  }
}

module.exports = LicitacionController;