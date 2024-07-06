const BaseRepository = require("./base.repository");
const empty = require("is-empty");
let _licitacion = null;

class LicitacionRepository extends BaseRepository {
  constructor({ Licitacion }) {
    super(Licitacion);
    _licitacion = Licitacion;
  }

  async getLicitacion(codigo) {
    return await _licitacion.findOne({ codigo });
  }

  async getPorAsignar(pageSize = 10, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await _licitacion
      .find({ listprotesis: {$size:0}})
      .skip(skips)
      .limit(pageSize);
  }
  async getByNom(nom) {
    return await _licitacion.find({$or: [ { codigo: {$regex: nom, $options: "i"} } ] });
  }
}

module.exports = LicitacionRepository;