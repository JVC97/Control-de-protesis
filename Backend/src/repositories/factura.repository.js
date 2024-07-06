const BaseRepository = require("./base.repository");
let _factura = null;

class FacturaRepository extends BaseRepository {
  constructor({ Factura }) {
    super(Factura);
    _factura = Factura;
  }

  async getFactura(codigo) {
    return await _factura.findOne({ codigo });
  }

  async getPagada(pageSize = 10, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await _factura
      .find({fechaPago: {$ne:""}})
      .skip(skips)
      .limit(pageSize);
  }
  async getPorPagar(pageSize = 10, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await _factura
      .find({fechaPago: ""})
      .skip(skips)
      .limit(pageSize);
  }
  async getByNom(cod) {
    console.log(cod);
    return await _factura.find( { codigo: {$regex: cod, $options: "i"} } );
  }
}

module.exports = FacturaRepository;