const BaseRepository = require("./base.repository");
let _visita = null;

class VisitaRepository extends BaseRepository {
  constructor({ Visita }) {
    super(Visita);
    _visita = Visita;
  }

  async getVisitaByProtesis(protesis) {
    return await _visita.find({protesis});
  }
}

module.exports = VisitaRepository;
